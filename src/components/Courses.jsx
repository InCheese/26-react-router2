import { Link, useLocation, useNavigate } from "react-router-dom";
import queryString from 'query-string';
import { useEffect, useState } from "react";
import courses from "../data/courses";

const SORT_KEYS = ['title', 'slug', 'id']

function sortCourses(courses, key){
  const sortedCourses = [...courses];
  if(!key || !SORT_KEYS.includes(key)) {
    return sortedCourses
  }
  sortedCourses.sort((a,b) => a[key]>b[key]? 1: -1); //чтобы сортировать и по тексту и по числам
  return sortedCourses    
}

const Courses = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const query = queryString.parse(location.search);
  const [sortKey, setSortKey] = useState(query.sort); //ожидаем в query наличие sort key
  console.log(sortKey);
  const [sortedCourses, setSortedCourses] = useState(sortCourses(courses, sortKey)); 
  console.log(sortCourses(courses, sortKey));

  //перенаправляет на courses, когда поиск по несуществующему полю
  useEffect( () => {
    if(!SORT_KEYS.includes(sortKey)){
      navigate('.');
      setSortKey(); //чтобы значение обнулялось
      setSortedCourses([...courses])
    }
  }, [sortKey, navigate])

  //console.log(sortKey)

  return (
    <>
      <h1>{sortKey?`Courses sorted by ${sortKey}`: "Courses"}</h1>
      {
        sortedCourses.map((course)=>
        <div key={course.id}>
          <Link to={course.slug} className="courseLink">{course.title} </Link>
        </div>
        )
      }
  </>)
  
};

export default Courses;
