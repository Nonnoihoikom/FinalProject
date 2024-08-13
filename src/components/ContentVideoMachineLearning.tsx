import React, { useState, useEffect, useRef } from "react";
import ReactPlayer from "react-player";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";
import { Container, Typography, Box } from "@mui/material";
import VideoLibraryOutlinedIcon from "@mui/icons-material/VideoLibraryOutlined";
import "../All-ContentVideo.css";

const ContentVideoMachineLearning: React.FC = () => {
  const [completedVideos, setCompletedVideos] = useState<string[]>([]);
  const [openVideo, setOpenVideo] = useState<string | null>(null);
  const firstRender = useRef(true); // Track the first render

  const videoList = [
    {
      title: "Mathematics and Statistics Foundations",
      time: " (2:09)",
      url: "https://youtu.be/8ZI55Inh1_A?si=mdGkxhUJTzSJIwbC",
    },
    {
      title: "Python for Machine Learning",
      time: " (49:42)",
      url: "https://www.youtube.com/watch?v=7eh4d6sabA0",
    },
    {
      title: "Fundamental Machine Learning Concepts",
      time: " (7:51)",
      url: "https://www.youtube.com/watch?v=ukzFI9rgwfU&t=21s",
    },
    {
      title: "Data Preprocessing",
      time: " (11:39)",
      url: "https://youtu.be/UoYO-MjqiVQ?si=7lE8bREzdC-ckYt3",
    },
    {
      title: "Model Building and Evaluation",
      time: " (5:00)",
      url: "https://www.youtube.com/watch?v=yN7ypxC7838",
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

export default ContentVideoMachineLearning;
