"use client";

import * as React from "react";
import ListItem from "@mui/joy/ListItem";
import Link from "@mui/joy/Link";
import Checkbox from "@mui/joy/Checkbox";
import CircularProgress from "@mui/joy/CircularProgress";
import Tabs from "@mui/joy/Tabs";
import TabList from "@mui/joy/TabList";
import Tab from "@mui/joy/Tab";
import TabPanel from "@mui/joy/TabPanel";
import Table from "@mui/joy/Table";
import { useEffect, useState } from "react";

type Scholarship = {
  amount: string;
  application_info: string;
  deadline: string;
  eligibility_info: string;
  grade_level: string;
  link: string;
  offered_by: string;
  requirements: string[];
  scholarship_type: string;
  title: string;
};

export default function Tracker() {
  // when this componenet loads, make api call to get scholarships
  const [interestedScholarships, setInterestedScholarships] = useState<
    Scholarship[]
  >([]);
  const [appliedScholarships, setAppliedScholarships] = useState<Scholarship[]>(
    []
  );
  const [acceptedScholarships, setAcceptedScholarships] = useState<
    Scholarship[]
  >([]);
  const [rejectedScholarships, setRejectedScholarships] = useState<
    Scholarship[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [email, setEmail] = useState(localStorage.getItem("userEmail") || "");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://127.0.0.1:8000/get_user/" + email
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const result = await response.json();
        console.log(result);
        // if (!result.interested) {
        //     result.interested = [];
        // }
        setInterestedScholarships(result.interested);
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

  const sleep = (ms: number | undefined) =>
    new Promise((r) => setTimeout(r, ms));

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
    <div
      className="h-screen border-b-2 border-gray-300 flex justify-center items-center inset-0 pt-2"
      style={{ backgroundColor: "#F0E6FF" }}
    >
      <Tabs
        aria-label="Vertical tabs"
        orientation="vertical"
        sx={{
          width: "98%",
          height: "90%",
          backgroundColor: "#F0E6FF",
        }}
      // className='bg-gradient-to-br from-purple-100 to-indigo-200'
      >
        <TabList sx={{ width: "10%" }}>
          <Tab
            sx={{
              backgroundColor: "transparent", // Default background
              '&[aria-selected="true"]': {
                backgroundColor: "#EFE5FF", // Custom background when active
                color: "black", // Text color when active
              },
              "&:hover": {
                backgroundColor: "#EFE5FF", // Background on hover
              },
            }}
          >
            Interested
          </Tab>
          <Tab
            sx={{
              backgroundColor: "transparent", // Default background
              '&[aria-selected="true"]': {
                backgroundColor: "#EFE5FF", // Custom background when active
                color: "black", // Text color when active
              },
              "&:hover": {
                backgroundColor: "#EFE5FF", // Background on hover
              },
            }}
          >
            Applied
          </Tab>
          <Tab
            sx={{
              backgroundColor: "transparent", // Default background
              '&[aria-selected="true"]': {
                backgroundColor: "#EFE5FF", // Custom background when active
                color: "black", // Text color when active
              },
              "&:hover": {
                backgroundColor: "#EFE5FF", // Background on hover
              },
            }}
          >
            Accepted
          </Tab>
          <Tab
            sx={{
              backgroundColor: "transparent", // Default background
              '&[aria-selected="true"]': {
                backgroundColor: "#EFE5FF", // Custom background when active
                color: "black", // Text color when active
              },
              "&:hover": {
                backgroundColor: "#EFE5FF", // Background on hover
              },
            }}
          >
            Rejected
          </Tab>
        </TabList>
        <TabPanel value={0} sx={{ width: "20%" }}>
          <Table
            aria-label="table variants"
            variant={"plain"}
            color={"neutral"}
            sx={{ backgroundColor: "#F0E6FF" }}
          >
            <thead>
              <tr>
                <th style={{ backgroundColor: "#F0E6FF", width: "30%" }}>
                  Title
                </th>
                <th style={{ backgroundColor: "#F0E6FF", width: "25%" }}>
                  Offered By
                </th>
                <th style={{ backgroundColor: "#F0E6FF", width: "10%" }}>
                  Amount
                </th>
                <th style={{ backgroundColor: "#F0E6FF", width: "15%" }}>
                  Deadline
                </th>
                <th style={{ backgroundColor: "#F0E6FF" }}>Link</th>
                <th style={{ backgroundColor: "#F0E6FF" }}>Mark as Applied</th>
              </tr>
            </thead>
            <tbody>
              {interestedScholarships.length > 0 ? (
                interestedScholarships.map((scholarship: Scholarship) => (
                  <tr key={scholarship.title}>
                    <td>{scholarship.title}</td>
                    <td>{scholarship.offered_by}</td>
                    <td>{scholarship.amount}</td>
                    <td>{scholarship.deadline}</td>
                    <td>
                      <Link
                        underline="always"
                        href={scholarship.link}
                        target="_blank"
                      >
                        Apply Here
                      </Link>
                    </td>
                    <td>
                      <div
                        style={{
                          display: "flex",
                          width: "100%",
                          height: "100%",
                          justifyContent: "center",
                          alignItems: "center",
                          alignContent: "center",
                        }}
                      >
                        <Checkbox
                          sx={{ marginRight: "35%" }}
                          onChange={async () => {
                            await sleep(500);
                            setInterestedScholarships((prev) =>
                              prev.filter((s) => s.title !== scholarship.title)
                            );
                            setAppliedScholarships((prev) => [...prev, scholarship]);
                          }}
                        />
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <ListItem>No items</ListItem>
              )}
            </tbody>
          </Table>
        </TabPanel>
        <TabPanel value={1} sx={{ width: "20%" }}>
          <Table
            aria-label="table variants"
            variant={"plain"}
            color={"neutral"}
            sx={{ backgroundColor: "#F0E6FF" }}
          >
            <thead>
              <tr>
                <th style={{ backgroundColor: "#F0E6FF", width: "30%" }}>
                  Title
                </th>
                <th style={{ backgroundColor: "#F0E6FF", width: "25%" }}>
                  Offered By
                </th>
                <th style={{ backgroundColor: "#F0E6FF", width: "10%" }}>
                  Amount
                </th>
                <th style={{ backgroundColor: "#F0E6FF", width: "15%" }}>
                  Link
                </th>
                <th style={{ backgroundColor: "#F0E6FF" }}>Mark as Accepted</th>
                <th style={{ backgroundColor: "#F0E6FF" }}>Mark as Rejected</th>
              </tr>
            </thead>
            {appliedScholarships.length > 0 ? (
              appliedScholarships.map((scholarship: Scholarship) => (
                <tr key={scholarship.title}>
                  <td>{scholarship.title}</td>
                  <td>{scholarship.offered_by}</td>
                  <td>{scholarship.amount}</td>
                  <td>
                    <Link
                      underline="always"
                      href={scholarship.link}
                      target="_blank"
                    >
                      View Here
                    </Link>
                  </td>
                  <td>
                    <Checkbox
                      sx={{ marginLeft: "30%" }}
                      onChange={async () => {
                        await sleep(500);
                        setAppliedScholarships((prev) =>
                          prev.filter((s) => s.title !== scholarship.title)
                        );
                        setAcceptedScholarships((prev) => [...prev, scholarship]);
                      }}
                    />
                  </td>
                  <td>
                    <Checkbox
                      sx={{ marginLeft: "30%" }}
                      onChange={async () => {
                        await sleep(500);
                        setAppliedScholarships((prev) =>
                          prev.filter((s) => s.title !== scholarship.title)
                        );
                        setRejectedScholarships((prev) => [...prev, scholarship]);
                      }}
                    />
                  </td>
                </tr>
              ))
            ) : (
              <ListItem>No items</ListItem>
            )}
          </Table>
        </TabPanel>
        <TabPanel value={2} sx={{ width: "20%" }}>
          <Table
            aria-label="table variants"
            variant={"plain"}
            color={"neutral"}
            sx={{ backgroundColor: "#F0E6FF" }}
          >
            <thead>
              <tr>
                <th style={{ backgroundColor: "#F0E6FF", width: "30%" }}>
                  Title
                </th>
                <th style={{ backgroundColor: "#F0E6FF", width: "25%" }}>
                  Offered By
                </th>
                <th style={{ backgroundColor: "#F0E6FF", width: "25%" }}>
                  Amount
                </th>
                <th style={{ backgroundColor: "#F0E6FF" }}>Link</th>
              </tr>
            </thead>
            {acceptedScholarships.length > 0 ? (
              acceptedScholarships.map((scholarship: Scholarship) => (
                <tr key={scholarship.title}>
                  <td>{scholarship.title}</td>
                  <td>{scholarship.offered_by}</td>
                  <td>{scholarship.amount}</td>
                  <td>
                    <Link
                      underline="always"
                      href={scholarship.link}
                      target="_blank"
                    >
                      View Here
                    </Link>
                  </td>
                </tr>
              ))
            ) : (
              <ListItem>No items</ListItem>
            )}
          </Table>
        </TabPanel>
        <TabPanel value={3} sx={{ width: "20%" }}>
          <Table
            aria-label="table variants"
            variant={"plain"}
            color={"neutral"}
            sx={{ backgroundColor: "#F0E6FF" }}
          >
            <thead>
              <tr>
                <th style={{ backgroundColor: "#F0E6FF", width: "30%" }}>
                  Title
                </th>
                <th style={{ backgroundColor: "#F0E6FF", width: "25%" }}>
                  Offered By
                </th>
                <th style={{ backgroundColor: "#F0E6FF", width: "25%" }}>
                  Amount
                </th>
                <th style={{ backgroundColor: "#F0E6FF" }}>Link</th>
              </tr>
            </thead>
            {rejectedScholarships.length > 0 ? (
              rejectedScholarships.map((scholarship: Scholarship) => (
                <tr key={scholarship.title}>
                  <td>{scholarship.title}</td>
                  <td>{scholarship.offered_by}</td>
                  <td>{scholarship.amount}</td>
                  <td>
                    <Link
                      underline="always"
                      href={scholarship.link}
                      target="_blank"
                    >
                      Apply Here
                    </Link>
                  </td>
                </tr>
              ))
            ) : (
              <ListItem>No items</ListItem>
            )}
          </Table>
        </TabPanel>
      </Tabs>
    </div>
  );
}
