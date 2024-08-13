import React, { useState, useEffect, useRef } from "react";
import ReactPlayer from "react-player";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";
import { Container, Typography, Box } from "@mui/material";
import VideoLibraryOutlinedIcon from "@mui/icons-material/VideoLibraryOutlined";
import "../All-ContentVideo.css";

const ContentVideoDataScience: React.FC = () => {
  const [completedVideos, setCompletedVideos] = useState<string[]>([]);
  const [openVideo, setOpenVideo] = useState<string | null>(null);
  const firstRender = useRef(true); // Track the first render

  const videoList = [
    {
      title: "Mathematics and Statistics Foundations Data science",
      time: " (20:16)",
      url: "https://www.youtube.com/watch?v=Lv0xcdeXaGU",
    },
    {
      title: "Programming Languages Data science",
      time: " (13:23)",
      url: "https://www.youtube.com/watch?v=e3h8V4INLvM",
    },
    {
      title: "Data Munging and Preparation",
      time: " (36:15)",
      url: "https://www.youtube.com/watch?v=ZebFU0ipYmk",
    },
    {
      title: "Machine Learning Data science",
      time: " (45:15)",
      url: "https://www.youtube.com/watch?v=Up6KLx3m2ww",
    },
    {
      title: "Data Visualization",
      time: " (27:20)",
      url: "https://www.youtube.com/watch?v=MiiANxRHSv4",
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

export default ContentVideoDataScience;
