"use client";

import * as React from "react";
import Button from "@mui/joy/Button";
import ButtonGroup from "@mui/joy/ButtonGroup";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import CardOverflow from "@mui/joy/CardOverflow";
import CardActions from "@mui/joy/CardActions";
import Typography from "@mui/joy/Typography";
import Image from "next/image";
import List from "@mui/joy/List";
import ListItem from "@mui/joy/ListItem";
import CircularProgress from "@mui/joy/CircularProgress";
import { useEffect, useState } from "react";

// scholarship type with attributes
export type Scholarship = {
  id: string;
  score: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  metadata: any;
};

export default function Dashboard() {
  // when this componenet loads, make api call to get scholarships
  const [recommendedScholarships, setRecommendedScholarships] = useState<
    Scholarship[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState(localStorage.getItem("userEmail") || "");
  const [error, setError] = useState("");
  const [i, setI] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://127.0.0.1:8000/pinecone_query/" + email
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const result = await response.json();
        setRecommendedScholarships(result.matches);
      } catch (error) {
        console.log(error);
        setError("error");
      } finally {
        setLoading(false);
      }
    };

    const storedEmail = localStorage.getItem("userEmail") || "";
    setEmail(storedEmail);
    fetchData();
  }, []); // Empty dependency array ensures it runs only once on mount

  async function userInterested(id: string) {
    console.log("User is interested in this scholarship" + id);
    // send a post request to the backend to update the user's interested scholarships
    const response = await fetch("http://127.0.0.1:8000/pinecone_interested", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        pineconeId: id,
      }),
    });
    console.log(response);
    setI(i + 1);
  }

  function userNotInterested() {
    console.log("User is not interested in this scholarship");
    setI(i + 1);
  }

  if (loading)
    return (
      <div className="h-screen border-b-2 border-gray-300 flex justify-center items-center inset-0 bg-gradient-to-br from-purple-100 to-indigo-200">
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignContent: "center",
            alignItems: "center",
            gap: "3vh",
          }}
        >
          <CircularProgress
            variant="solid"
            sx={{
              "--CircularProgress-progressColor": "#A020F0",
              "--CircularProgress-trackColor": "#CBC3E3",
            }}
            size="lg"
          />
          <p>Loading...</p>
        </div>
      </div>
    );
  if (error)
    return (
      <div className="h-screen border-b-2 border-gray-300 flex justify-center items-center inset-0 bg-gradient-to-br from-purple-100 to-indigo-200">
        <p>Error: {error}</p>
      </div>
    );
  return (
    <div>
      {/* <div className='border-b-2 border-gray-300 flex justify-center items-center inset-0 bg-gradient-to-br from-purple-100 to-indigo-200'>
                <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                <Link href="#underline" underline="always">
                    Always
                </Link>
                <Link href="#underline" underline="hover">
                    Hover
                </Link>
                <Link href="#underline" underline="none">
                    None
                </Link>
                </Box>
            </div> */}
      <div className="h-screen border-b-2 border-gray-300 flex justify-center items-center inset-0 bg-gradient-to-br from-purple-100 to-indigo-200">
        <Card
          sx={{
            width: "100vh",
            height: "50vh",
            maxWidth: "100%",
            boxShadow: "lg",
            borderRadius: "24px",
          }}
        >
          <CardContent sx={{ alignItems: "center", textAlign: "center" }}>
            <Typography level="title-lg" sx={{ marginTop: "1vh" }}>
              {recommendedScholarships[i].metadata.title}
            </Typography>
            <Typography level="body-sm" sx={{}}>
              {recommendedScholarships[i].metadata.offered_by}
            </Typography>
            <div
              style={{
                flexDirection: "row",
                display: "flex",
                alignItems: "center",
                height: "100%",
                width: "95%",
              }}
            >
              <div style={{ width: "20%", marginRight: "5%" }}>
                <CircularProgress
                  variant="solid"
                  size="lg"
                  value={recommendedScholarships[i].score * 100}
                  determinate
                  sx={{
                    "--CircularProgress-progressColor": "#A020F0",
                    "--CircularProgress-trackColor": "#CBC3E3",
                  }}
                />
                <p>
                  {Math.round(recommendedScholarships[i].score * 100)}% Match
                </p>
              </div>
              <CardContent sx={{ width: "50%", alignItems: "left" }}>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "1vh",
                    justifyContent: "flex-start",
                    alignItems: "left",
                    height: "100%",
                    textAlign: "left",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      gap: "0.3vw",
                    }}
                  >
                    <Image
                      src="/graduation-cap-emoji-clipart-xl.png"
                      alt="scholarship"
                      width={25}
                      height={25}
                    />
                    <strong>Grade Level</strong>
                  </div>
                  <p style={{ marginBottom: "2vh" }}>
                    {recommendedScholarships[i].metadata.grade_level}
                  </p>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      gap: "0.3vw",
                    }}
                  >
                    <Image
                      src="/1f4b2.png"
                      alt="scholarship"
                      width={25}
                      height={25}
                    />
                    <strong>Amount</strong>
                  </div>
                  <p style={{ marginBottom: "2vh" }}>
                    {recommendedScholarships[i].metadata.amount}
                  </p>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      gap: "0.3vw",
                    }}
                  >
                    <Image
                      src="/spiral-calendar-emoji-2048x2047-wckuso5j.png"
                      alt="scholarship"
                      width={25}
                      height={25}
                    />
                    <strong>Deadline</strong>
                  </div>
                  <p>{recommendedScholarships[i].metadata.deadline}</p>
                </div>
              </CardContent>
              <div style={{ width: "40%", textAlign: "left" }}>
                <strong>Requirements</strong>
                <List
                  marker="disc"
                  sx={{
                    alignItems: "start",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "left",
                    gap: "0vh",
                  }}
                >
                  {/* map through the requirements and display them if it's not empty, otherwise make a list item say no requirements*/}
                  {recommendedScholarships[i].metadata.requirements.length >
                  0 ? (
                    recommendedScholarships[i].metadata.requirements.map(
                      (requirement: string) => (
                        <ListItem key={requirement}>{requirement}</ListItem>
                      )
                    )
                  ) : (
                    <ListItem>No requirements</ListItem>
                  )}
                </List>
              </div>
            </div>
          </CardContent>
          <CardOverflow sx={{ bgcolor: "background.level1" }}>
            <CardActions buttonFlex="1">
              <ButtonGroup
                variant="outlined"
                sx={{ bgcolor: "background.surface" }}
              >
                <Button
                  variant="soft"
                  sx={{
                    backgroundColor: "#DDE7EE",
                    "&:hover": {
                      backgroundColor: "#d7dbdd",
                    },
                  }}
                  onClick={userNotInterested}
                >
                  Not Interested
                </Button>
                <Button
                  variant="soft"
                  sx={{
                    backgroundColor: "#CF9FFF", // Background color
                    // color: "#FFFFFF",
                    "&:hover": {
                      backgroundColor: "#ce93d8", // Background on hover
                    },
                    "&:active": {
                      color: "#6D178F", // Background on click
                    },
                  }}
                  onClick={() => userInterested(recommendedScholarships[i].id)}
                >
                  Interested
                </Button>
              </ButtonGroup>
            </CardActions>
          </CardOverflow>
        </Card>
      </div>
    </div>
  );
}
