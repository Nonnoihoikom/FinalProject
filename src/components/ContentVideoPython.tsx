import React, { useState, useEffect, useRef } from "react";
import ReactPlayer from "react-player";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";
import { Container, Typography, Box } from "@mui/material";
import VideoLibraryOutlinedIcon from "@mui/icons-material/VideoLibraryOutlined";
import "../All-ContentVideo.css";

const ContentVideoPython: React.FC = () => {
  const [completedVideos, setCompletedVideos] = useState<string[]>([]);
  const [openVideo, setOpenVideo] = useState<string | null>(null);
  const firstRender = useRef(true); // Track the first render

  const videoList = [
    {
      title: "Introduction to Python",
      time: " (2:23)",
      url: "https://www.youtube.com/watch?v=x7X9w_GIm1s",
    },
    {
      title: "Basic Syntax and Data Types",
      time: " (13:30)",
      url: "https://www.youtube.com/watch?v=LKFrQXaoSMQ",
    },
    {
      title: "Control Structures",
      time: " (5:55)",
      url: "https://www.youtube.com/watch?v=_yb0DwZnnhY",
    },
    {
      title: "Functions and Modules",
      time: " (10:37)",
      url: "https://www.youtube.com/watch?v=89cGQjB5R4M",
    },
    {
      title: "Error Handling",
      time: " (7:38)",
      url: "https://www.youtube.com/watch?v=j_q6NGOwDJo",
    },
  ];

  useEffect(() => {
    const savedVideos = localStorage.getItem("completedVideos");
    if (savedVideos) {
      setCompletedVideos(JSON.parse(savedVideos));
    }
  }, []);

  useEffect(() => {
    // Avoid updating localStorage on first render when StrictMode is on
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    localStorage.setItem("completedVideos", JSON.stringify(completedVideos));
  }, [completedVideos]);

  const toggleVideo = (url: string) => {
    setOpenVideo(openVideo === url ? null : url);
  };

  const handleVideoComplete = (title: string) => {
    setCompletedVideos((prevCompletedVideos) => {
      if (!prevCompletedVideos.includes(title)) {
        return [...prevCompletedVideos, title];
      }
      return prevCompletedVideos;
    });
  };

  return (
    <Container maxWidth="md" className="content-video">
      <Typography
        variant="h4"
        align="center"
        gutterBottom
        sx={{
          color: "#ffd700",
          fontWeight: "bold",
          "&:hover": {
            color: "#ffc300",
          },
        }}
      >
        Course Video
      </Typography>
      <div className="video-list">
        {videoList.map((video) => (
          <Box
            key={video.title}
            className="video-row"
            style={{
              backgroundColor: openVideo === video.url ? "#ffd700" : "#ffc300",
            }}
          >
            <div
              className="video-row-title"
              onClick={() => toggleVideo(video.url)}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                cursor: "pointer",
              }}
            >
              <span>
                {completedVideos.includes(video.title) && (
                  <CheckOutlinedIcon className="completed-icon" />
                )}
                <VideoLibraryOutlinedIcon />
                {video.title}
                {video.time}
              </span>

              <div>
                {openVideo === video.url ? (
                  <ExpandLessIcon className="arrow-icon" />
                ) : (
                  <ExpandMoreIcon className="arrow-icon" />
                )}
              </div>
            </div>
            {openVideo === video.url && (
              <div className="video-content">
                <ReactPlayer
                  url={video.url}
                  playing
                  controls
                  width="100%"
                  height="400px"
                  onEnded={() => handleVideoComplete(video.title)}
                />
              </div>
            )}
          </Box>
        ))}
      </div>
    </Container>
  );
};

export default ContentVideoPython;
