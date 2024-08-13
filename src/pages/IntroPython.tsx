import { useEffect, useState } from "react";
import axios from "axios";
import AppAppBar from "../components/AppAppBar";
import StickyFooter from "../pages/FooterPages";
import ContentVideoPython from "../components/ContentVideoPython";
import { useParams } from "react-router-dom";
import "../IntroPython.css";

interface Course {
  id: number;
  category: string;
  description: string;
  name: string;
}

const IntroPython = () => {
  const { id } = useParams<{ id: string }>();
  const [course, setCourse] = useState<Course | null>(null);

  useEffect(() => {
    axios
      .get(
        `https://c6ac9ab7-0ad6-4a92-8639-9a116c258fe1-00-299g209a7syl0.sisko.replit.dev/courses/${id}`
      )
      .then((response) => {
        setCourse(response.data);
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  }, [id]);

  return (
    <div className="page-container">
      <AppAppBar />
      <div className="content-container">
        <div className="course-details">
          {course && (
            <div className="course-content-python">
              <h1>{course.category}</h1>
              <p>{course.description}</p>
              <h2>{course.name}</h2>
            </div>
          )}
        </div>
        <ContentVideoPython />
      </div>
      <StickyFooter />
    </div>
  );
};

export default IntroPython;
