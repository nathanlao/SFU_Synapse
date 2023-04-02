import React, { useState, useEffect } from "react";
import CourseSelector from "../../components/CourseSelector/CourseSelector";
import "./EditCourseEnrollment.css"


export default function EditCourseEnrollment() {
    const [list, setList] = useState([])
    const [year] = useState(() => {
        return getYearAndTerm().year
    })
    
    const [term] = useState(() => {
        return getYearAndTerm().term
    })

    const updateList = (list) => {
        console.log(list)
        setList(list)
    }

    useEffect(() => {
        console.log('received update from child component')
        console.log(list)

    }, [list])

    // helper function
    function getYearAndTerm() {
        const time = new Date()
        const year = time.getFullYear()
        const month = time.getMonth() + 1

        if(month < 5) {
            return { year: year, term: 'spring'}
        }else if(month < 9) {
            return { year: year, term: 'summer'}
        }else {
            return { year: year, term: 'fall'}
        }
    }

    async function handleBtnClick() {
                   
        // 1 remove existing courses which are labeled as not to keep
        const promises1 = list.filter((item) => {
            return item.keep === false
        }).map((item) => {
            const url = `/api/${year}/${term}/${item.dep}/${item.num}/${item.section}`
            return fetch(url, { method: 'DELETE' })
        })
        await Promise.all(promises1)
        console.log('Removed courses')
        
        // 2 add new courses
        const promises2 = list.filter((item) => {
            return item.keep && item.new_item
        }).map((item) => {
            const url = `/api/${year}/${term}/${item.dep}/${item.num}/${item.section}`
            return fetch(url, { method: 'POST' })
        })
        await Promise.all(promises2)
        console.log('Added new courses')

        console.log('Edited course enrollment!!')
    }

    return (
        <div className="edit-course-enrollment">
            <h2>Edit Course Enrollment</h2>
            <CourseSelector year={year} term={term} updateParentList={updateList} setup={false} />
            <button type="button" className="btn btn-light" onClick={handleBtnClick}>Confirm changes</button>
            <small>*Refresh after clicking: just for now. haven't implemented it to make component update yet</small>
        </div>
    )
}