import React, { useState, useEffect } from "react";
import CourseSelector from "../../components/CourseSelector/CourseSelector";

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

    return (
        <div className="edit-course-enrollment">
            <CourseSelector year={year} term={term} updateParentList={updateList} setup={false} />
        </div>
    )
}