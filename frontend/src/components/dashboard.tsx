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

export function Dashboard() {
    return (
        <div className="h-screen border-b-2 border-gray-300 flex justify-center items-center inset-0 bg-gradient-to-br from-purple-100 to-indigo-200">
            <Card sx={{ width: "100vh", height: "50vh", maxWidth: '100%', boxShadow: 'lg', borderRadius: "24px" }}>
                <CardContent sx={{ alignItems: 'center', textAlign: 'center' }}>
                    <Typography level="title-lg" sx={{ marginBottom: '' }}>“Making Waves” Scholarship for Women</Typography>
                    <Typography level="body-sm" sx={{ maxWidth: '24ch' }}>Offered by Scholarships360</Typography>
                    <div style={{ flexDirection: "row", display: "flex", alignItems: "center", height: "100%", width: "95%" }}>
                        <div style={{ width: "20%", marginRight: "5%" }}>
                            <CircularProgress variant="solid" size="lg" value={72} determinate sx={{ '--CircularProgress-progressColor': "#A020F0", '--CircularProgress-trackColor': "#CBC3E3" }} />
                            <p>72% Match</p>
                        </div>
                        <CardContent sx={{ width: '50%' }}>
                            <div style={{ display: "flex", flexDirection: "column", gap: "1vh", justifyContent: "center", alignItems: "left", height: "100%" }}>
                                <div style={{ display: "flex", flexDirection: "row", gap: "0.3vw" }}>
                                    <Image src="/graduation-cap-emoji-clipart-xl.png" alt="scholarship" width={25} height={25} />
                                    <strong>Grade Level</strong>
                                    <p>All Grade Levels</p>
                                </div>
                                <div style={{ display: "flex", flexDirection: "row", gap: "0.3vw" }}>
                                    <Image src="/1f4b2.png" alt="scholarship" width={25} height={25} />
                                    <strong>Amount</strong>
                                    <p>$5,000</p>
                                </div>
                                <div style={{ display: "flex", flexDirection: "row", gap: "0.3vw" }}>
                                    <Image src="/spiral-calendar-emoji-2048x2047-wckuso5j.png" alt="scholarship" width={25} height={25} />
                                    <strong>Deadline</strong>
                                    <p>June 30, 2025</p>
                                </div>
                            </div>
                        </CardContent>
                        <div style={{ width: "40%" }}>
                            <strong>Requirements</strong>
                            <List marker='disc' sx={{ alignItems: 'start', display: 'flex', flexDirection: 'column', justifyContent: 'left', gap: '0vh' }}>
                                <ListItem>Essay</ListItem>
                                <ListItem>Academic transcript</ListItem>
                                <ListItem>Two letters of recommendation</ListItem>
                                <ListItem>Proof of enrollment</ListItem>
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
                            }}>Not Interested</Button>
                            <Button variant='soft' sx={{
                                backgroundColor: '#CF9FFF', // Background color
                                // color: "#FFFFFF",
                                '&:hover': {
                                    backgroundColor: '#ce93d8', // Background on hover
                                },
                                '&:active': {
                                    color: '#6D178F', // Background on click
                                },
                            }}>Interested</Button>
                        </ButtonGroup>
                    </CardActions>
                </CardOverflow>
            </Card>
        </div>
    );
}
