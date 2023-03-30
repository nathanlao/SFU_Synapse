import React, { useEffect, useState } from "react"
import { useNavigate } from 'react-router-dom';
import CourseListViewer from "../../components/CourseListViewer/CourseListViewer"
import { requiresLogin } from "../../services/authentication.service"
import './Admin.css'


export default function Admin() {
    const navigate = useNavigate()

    // selector options
    const [years] = useState(() => {
        const time = new Date()
        const year = time.getFullYear()
        let years = []
        for(let i = 0; i < 3; i++) {
            years.push(year - i)
        }
        return years
    })
    const [terms] = useState([
        { value: 'fall', text: 'Fall' },
        { value: 'spring', text: 'Spring' },
        { value: 'summer', text: 'Summer' }
    ])

    // pass to listviewer component
    const [targetYear, setTargetYear] = useState(years[0])
    const [targetTerm, setTargetTerm] = useState(terms[0].value)

    useEffect(() => {
        async function init() {
            // check login status
            if(await requiresLogin('admin')) {
                navigate('/admin/login', { replace: true })
            }
        }
        init()
    }, [])


    function handleYearChange(event) {
        setTargetYear(event.target.value)
    }
    function handleTermChange(event) {
        setTargetTerm(event.target.value)
    }

    return (
        <div className="admin-dashboard">
            <h1>Manage courses</h1>
            <select name="academicTerm" id="selectAcademicTerm" onChange={handleTermChange}>
                {terms.map((option, index) => (
                    <option key={index} value={option.value}>{option.text}</option>
                ))}
            </select>
            <select name="academicYear" id="selectAcademicYear" onChange={handleYearChange}>
                {years.map((option, index) => (
                    <option key={index} value={option}>{option}</option>
                ))}
            </select>

            <section className="workarea">
                <CourseListViewer year={targetYear} term={targetTerm}/>
            </section>
        </div>
    )
}