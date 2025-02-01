const puppeteer = require("puppeteer-extra");
const fs = require('fs');
const StealthPlugin = require("puppeteer-extra-plugin-stealth");

puppeteer.use(StealthPlugin());

async function get_scholarships() {
    const browser = await puppeteer.launch({
        headless: false,
        // Set default viewport for all pages
        defaultViewport: {
            width: 1920,
            height: 1080,
        },
        // Optional: Force window size (may include browser UI elements)
        args: ['--window-size=1920,1080']
    });
    const page = await browser.newPage();
    await page.setViewport({ width: 1920, height: 1080 });
    let scholorship_data = [];

    for (let i = 0; i < 283; i++) {
        console.log();
        // each page has 20 scholarships, so calculate the page number based on the index
        let pageNumber = Math.floor(i / 20) + 1;
        await page.goto("https://scholarships360.org/scholarships/top-scholarships-for-women/?sidebar_sort=relevant&current_page=" + pageNumber + "&filter=all");
        let scholarshipsSelector = "div.s360-post-scholarships-main-list.redesign";
        await page.waitForSelector(scholarshipsSelector);

        // Select all nested divs inside the scholarships list
        let divs = await page.$$(scholarshipsSelector + " > div");
        console.log('idx:', i);
        // use i mod 20 to get the index of the scholarship on the page
        let div = divs[i % 20];
        let href = "";

        // Find the <a> tag inside the current div
        let linkHandle = await div.$("h4 a");
        if (linkHandle) {
            // Extract the href attribute
            href = await linkHandle.evaluate(a => a.href);
        } else {
            console.log(`No link found in div ${i + 1}`);
        }

        // check if scholarships360.org is the start of the url and if so go to it
        if (!href.includes("scholarships360.org")) {
            console.log("Not a scholarships360.org link");
            continue;
        }
        await page.goto(href);

        title = "section.re-scholarship-intro div.re-content div.re-row h1";
        await page.waitForSelector(title);
        let titleText = await page.$eval(title, el => el.innerText);

        const offeredBySelector = "section.re-scholarship-intro div.re-content div.re-row h1 + div p";
        await page.waitForSelector(offeredBySelector);
        let offeredByText = await page.$eval(offeredBySelector, el => el.innerText);

        // Amount being awarded
        const amountSelector = "div.re-scholarship-main-sidebar-awards p";
        await page.waitForSelector(amountSelector);
        let amount = await page.$eval(amountSelector, el => el.innerText.trim());

        // const gradeLevelSelector = "div.re-scholarship-main-sidebar-grid > div:nth-child(1) p";
        // await page.waitForSelector(gradeLevelSelector);
        // let gradeLevel = await page.$eval(gradeLevelSelector, el => el.innerText.trim());

        // const deadlineSelector = `div.re-scholarship-main-sidebar-grid > div:nth-child(3) > p:not(h6 p)`;
        // await page.waitForSelector(deadlineSelector);
        // let deadline = await page.$eval(deadlineSelector, el => el.innerText.trim());

        // Grade Level
        const gradeLevel = await page.evaluate(() => {
            const h6 = document.evaluate(
                `//h6[contains(translate(., 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), 'grade level')]`,
                document,
                null,
                XPathResult.FIRST_ORDERED_NODE_TYPE,
                null
            ).singleNodeValue;
            return h6?.nextElementSibling?.textContent?.trim() || 'Not found';
        });

        // Deadline
        const deadline = await page.evaluate(() => {
            const h6 = document.evaluate(
                `//h6[contains(translate(., 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), 'deadline')]`,
                document,
                null,
                XPathResult.FIRST_ORDERED_NODE_TYPE,
                null
            ).singleNodeValue;
            return h6?.nextElementSibling?.textContent?.trim() || 'Not found';
        });

        const scholarshipInfo = await page.evaluate(() => {
            const startElement = document.evaluate(
                `//h4[contains(., "Scholarship Overview")]`,
                document,
                null,
                XPathResult.FIRST_ORDERED_NODE_TYPE,
                null
            ).singleNodeValue;

            if (!startElement) return 'Scholarship Overview section not found';

            // Find the FIRST ending div after the overview
            let endElement = startElement.nextElementSibling;
            while (endElement && !endElement.classList.contains('re-scholarship-main-line')) {
                endElement = endElement.nextElementSibling;
            }

            if (!endElement) return 'End marker not found';

            let content = [];
            let currentNode = startElement.nextElementSibling;

            // Collect elements between start and first end marker
            while (currentNode && currentNode !== endElement) {
                // Process all child nodes in order
                const nodes = Array.from(currentNode.childNodes);
                let currentText = '';

                for (const node of nodes) {
                    if (node.nodeType === Node.TEXT_NODE) {
                        // Handle text nodes
                        currentText += node.textContent.trim() + ' ';
                    } else if (node.nodeType === Node.ELEMENT_NODE) {
                        // Handle element nodes
                        if (currentText.length > 0) {
                            content.push(currentText.replace(/\s+/g, ' ').trim());
                            currentText = '';
                        }

                        if (node.tagName === 'A') {
                            // Handle links
                            const linkText = node.textContent.trim();
                            const href = node.href;
                            content.push(`${linkText} [${href}]`);
                        } else {
                            // Handle other elements (like strong tags)
                            const elementText = node.textContent.trim();
                            if (elementText) {
                                content.push(elementText);
                            }
                        }
                    }
                }

                // Add any remaining text
                if (currentText.length > 0) {
                    content.push(currentText.replace(/\s+/g, ' ').trim());
                }

                currentNode = currentNode.nextElementSibling;
            }

            return content.join('\n');
        });

        const eligibilityInfo = await page.evaluate(() => {
            // Find eligibility section
            const eligibilityHeader = document.evaluate(
                `//h4[contains(., "Eligibility information")]`,
                document,
                null,
                XPathResult.FIRST_ORDERED_NODE_TYPE,
                null
            ).singleNodeValue;

            if (!eligibilityHeader) return 'Eligibility section not found';

            const results = [];

            // Get description paragraph
            const description = eligibilityHeader.nextElementSibling?.textContent?.trim();
            if (description) results.push(description);

            // Get requirements list
            const requirementsContainer = document.querySelector('.re-scholarship-main-lists');
            if (requirementsContainer) {
                Array.from(requirementsContainer.querySelectorAll('.re-scholarship-main-lists-single')).forEach(div => {
                    const label = div.querySelector('strong')?.textContent?.trim().toUpperCase();
                    const value = div.querySelector('p')?.textContent?.trim();

                    if (label && value) {
                        results.push(`${label}: ${value}`);
                    }
                });
            }

            return results.join('\n\n');
        });

        const applicationInfo = await page.evaluate(() => {
            const results = [];

            // Find application information header
            const appHeader = document.evaluate(
                `//h4[contains(., "Application information")]`,
                document,
                null,
                XPathResult.FIRST_ORDERED_NODE_TYPE,
                null
            ).singleNodeValue;

            if (!appHeader) return 'No application information found';

            // Get general application text
            const generalText = appHeader.nextElementSibling?.textContent?.trim();
            if (generalText) results.push(generalText);

            // Check for essay prompt section
            const essaySection = document.querySelector('.re-scholarship-main-quick-single');
            if (essaySection) {
                const promptTitle = essaySection.querySelector('p:first-child')?.textContent?.trim();
                const promptText = essaySection.querySelector('p:nth-child(2)')?.textContent?.trim();
                const wordLimit = essaySection.querySelector('p:last-child')?.textContent?.trim();

                if (promptTitle && promptText) {
                    results.push(
                        `\n${promptTitle}:\n${promptText}` +
                        (wordLimit ? `\n${wordLimit}` : '')
                    );
                }
            }

            return results.join('\n');
        });

        const requirements = await page.evaluate(() => {
            const results = [];
            // Find the H4 containing "Application information"
            const appInfoHeader = Array.from(document.querySelectorAll('h4'))
                .find(h4 => h4.textContent.includes('Application information'));

            if (!appInfoHeader) return []; // Exit if header not found

            // Get the NEXT SIBLING DIV with class re-scholarship-main-lists
            const listsDiv = appInfoHeader.nextElementSibling?.nextElementSibling; // Skip empty <p>

            if (listsDiv && listsDiv.classList.contains('re-scholarship-main-lists')) {
                // Extract all list items
                const listItems = listsDiv.querySelectorAll('.re-scholarship-main-lists-single');

                listItems.forEach(item => {
                    const text = item.querySelector('p')?.textContent?.trim();
                    if (text) results.push(text);
                });
            }

            return results;
        });

        console.log("Title:", titleText);
        console.log("Offered by:", offeredByText);
        console.log("Amount:", amount);
        console.log("Grade Level:", gradeLevel);
        console.log("Deadline:", deadline);
        console.log("Scholarship Info:\n", scholarshipInfo);
        console.log("Eligibility Information:\n", eligibilityInfo);
        console.log("Application Information:\n", applicationInfo);
        console.log('Application Requirements:', requirements);

        // create an object for all these fields and push it to the array scholarship_data
        let scholarship = {
            title: titleText,
            link: href,
            offeredBy: offeredByText,
            amount: amount,
            gradeLevel: gradeLevel,
            deadline: deadline,
            scholarshipInfo: scholarshipInfo,
            eligibilityInfo: eligibilityInfo,
            applicationInfo: applicationInfo,
            requirements: requirements
        }

        scholorship_data.push(scholarship);
    }

    // write scholarship data to a json file
    fs.writeFileSync('scholarships.json', JSON.stringify(scholorship_data, null, 2));
    console.log('done');

    // await browser.close();
}

get_scholarships()