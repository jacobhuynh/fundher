"use client";

import * as React from 'react';
import Button from '@mui/joy/Button';
import ButtonGroup from '@mui/joy/ButtonGroup';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import CardOverflow from '@mui/joy/CardOverflow';
import CardActions from '@mui/joy/CardActions';
import Typography from '@mui/joy/Typography';
import Image from 'next/image';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import CircularProgress from '@mui/joy/CircularProgress';
import { useEffect, useState } from 'react';

// scholarship type with attributes
export type Scholarship = {
    id: string;
    score: number;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    metadata: any;
};

export function Dashboard() {
    // when this componenet loads, make api call to get scholarships
    const [recommendedScholarships, setRecommendedScholarships] = useState<Scholarship[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    let i = 0;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("http://127.0.0.1:8000/pinecone_query/hello@gmail.com");
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                const result = await response.json();
                setRecommendedScholarships(result.matches);
            } catch (error) {
                console.log('yo');
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []); // Empty dependency array ensures it runs only once on mount

    function userInterested() {
        console.log("User is interested in this scholarship");
        i += 1;
    }

    function userNotInterested() {
        console.log("User is not interested in this scholarship");
        i += 1;
    }

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;
    return (
        <div className="h-screen border-b-2 border-gray-300 flex justify-center items-center inset-0 bg-gradient-to-br from-purple-100 to-indigo-200">
            <Card sx={{ width: "100vh", height: "50vh", maxWidth: '100%', boxShadow: 'lg', borderRadius: "24px" }}>
                <CardContent sx={{ alignItems: 'center', textAlign: 'center' }}>
                    <Typography level="title-lg" sx={{ marginBottom: '' }}>{recommendedScholarships[i].metadata.title}</Typography>
                    <Typography level="body-sm" sx={{ }}>{recommendedScholarships[i].metadata.offered_by}</Typography>
                    <div style={{ flexDirection: "row", display: "flex", alignItems: "center", height: "100%", width: "95%" }}>
                        <div style={{ width: "20%", marginRight: "5%" }}>
                            <CircularProgress variant="solid" size="lg" value={recommendedScholarships[i].score * 100} determinate sx={{ '--CircularProgress-progressColor': "#A020F0", '--CircularProgress-trackColor': "#CBC3E3" }} />
                            <p>{Math.round(recommendedScholarships[i].score * 100)}% Match</p>
                        </div>
                        <CardContent sx={{ width: '50%' }}>
                            <div style={{ display: "flex", flexDirection: "column", gap: "1vh", justifyContent: "center", alignItems: "left", height: "100%" }}>
                                <div style={{ display: "flex", flexDirection: "row", gap: "0.3vw" }}>
                                    <Image src="/graduation-cap-emoji-clipart-xl.png" alt="scholarship" width={25} height={25} />
                                    <strong>Grade Level</strong>
                                    <p>{recommendedScholarships[i].metadata.grade_level}</p>
                                </div>
                                <div style={{ display: "flex", flexDirection: "row", gap: "0.3vw" }}>
                                    <Image src="/1f4b2.png" alt="scholarship" width={25} height={25} />
                                    <strong>Amount</strong>
                                    <p>{recommendedScholarships[i].metadata.amount}</p>
                                </div>
                                <div style={{ display: "flex", flexDirection: "row", gap: "0.3vw" }}>
                                    <Image src="/spiral-calendar-emoji-2048x2047-wckuso5j.png" alt="scholarship" width={25} height={25} />
                                    <strong>Deadline</strong>
                                    <p>{recommendedScholarships[i].metadata.deadline}</p>
                                </div>
                            </div>
                        </CardContent>
                        <div style={{ width: "40%" }}>
                            <strong>Requirements</strong>
                            <List marker='disc' sx={{ alignItems: 'start', display: 'flex', flexDirection: 'column', justifyContent: 'left', gap: '0vh' }}>
                                {/* map through the requirements and display them */}
                                {recommendedScholarships[i].metadata.requirements.map((requirement) => {
                                    return <ListItem key={requirement}>{requirement}</ListItem>
                                })}
                            </List>
                        </div>
                    </div>
                </CardContent>
                <CardOverflow sx={{ bgcolor: 'background.level1' }}>
                    <CardActions buttonFlex="1">
                        <ButtonGroup variant="outlined" sx={{ bgcolor: 'background.surface' }}>
                            <Button variant="soft" sx={{
                                backgroundColor: "#DDE7EE",
                                '&:hover': {
                                    backgroundColor: '#d7dbdd',
                                },
                            }} onClick={userNotInterested}>Not Interested</Button>
                            <Button variant='soft' sx={{
                                backgroundColor: '#CF9FFF', // Background color
                                // color: "#FFFFFF",
                                '&:hover': {
                                    backgroundColor: '#ce93d8', // Background on hover
                                },
                                '&:active': {
                                    color: '#6D178F', // Background on click
                                },
                            }} onClick={userInterested}>Interested</Button>
                        </ButtonGroup>
                    </CardActions>
                </CardOverflow>
            </Card>
        </div>
    );
}
