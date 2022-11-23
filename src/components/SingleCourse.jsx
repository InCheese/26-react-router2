import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {useEffect} from 'react'
import courses from "../data/courses";

const SingleCourse = () => {
  const params = useParams();
  //console.log(params);
  const navigate = useNavigate()
  // const location = useLocation()
  // console.log(location)

  const course = courses.find(course => course.slug === params.courseSlug);

      useEffect(()=>{
        if(!course){
            navigate()
      }

    }, [course, navigate])

  //вытянули данные из url строки веб-браузера

  //Simply show not found
  // if(!course) {
  //   return <NotFound />
  // }

 
  return (
    <>
      <h1>{course?.title}</h1>
      <h2>{course?.slug}</h2>
      <h3>{course?.id}</h3>

      <Link to=".." relative = "path">All courses</Link>
    </>
  )
};

export default SingleCourse;
