import React, { useEffect, useState } from "react"
import './CourseSelector.css'
import Select from 'react-select'


export default function CourseSelector({year, term, updateParentList, setup}) {
    const [deps, setDeps] = useState([]) // list of departments (eg [CHEM, CMPT, ...])
    const [courses, setCourses] = useState([]) // list of courses (eg [372, 200, ...])
    const [sections, setSections] = useState([])
    const [selectedList, setSelectedList] = useState([])

    // selected dep, course
    const [dep, setDep] = useState(null)
    const [course, setCourse] = useState(null)

    useEffect(() => {
        async function fetchDeps() {
            const url = `/api/course-list/${year}/${term}`
            const result = await fetch(url)
            if(result.status !== 200) {
                alert('status code NOT 200')
                return
            }
    
            const data = await result.json()
            console.log(data)
            const tempDeps = []
            data.map((item) => {
                tempDeps.push(
                    { label: item.dep.toUpperCase(), value: item.dep }
                )
            })
    
            console.log(tempDeps)
            setDeps(tempDeps)
        }
        fetchDeps()

        // not account setup
        if(!setup) {
            console.log("getting enrolled courses")

            async function fetchEnrolledCourses() {
                const username = 'testuser' // DEV replace once login sessions are implemented
                const url = `/api/${username}/course/${year}/${term}`
                const result = await fetch(url)
                if(result.status !== 200) {
                    console.log('DEBUG: CourseSelector.jsx: 48')
                    alert('status code NOT 200')
                    
                    return
                }

                const data = await result.json()
                console.log(data)
                const enrolledList = data.map((item) => {
                    return {...item, new_item: false, keep: true}
                })
                setSelectedList(enrolledList)
            }
            fetchEnrolledCourses()
        }

    }, [])


    useEffect(() => {
        if(dep === null) return

        async function fetchCourses() {
            const url = `/api/course-list/${year}/${term}/${dep.value}`
            const result = await fetch(url)
            if(result.status !== 200) {
                alert('status code NOT 200')
                return
            }
    
            const data = await result.json()
            console.log(data)
            const tempCourses = []
            data.map((item) => {
                tempCourses.push(
                    { label: item.num.toUpperCase(), value: item.num }
                )
            })
    
            console.log(tempCourses)
            setCourses(tempCourses)
        }

        fetchCourses()
        setCourse(null)
        setSections([])
    }, [dep])


    useEffect(() => {
        
        if(dep === null || course === null) {
            return
        }
        console.log('Department: ' + dep.label + ' Course: ' + course.label)
        
        async function fetchSections() {
            const url = `/api/course-list/${year}/${term}/${dep.value}/${course.value}`
            const result = await fetch(url)
            if(result.status !== 200) {
                alert('status code NOT 200')
                return []
            }
    
            const data = await result.json()
            console.log(data)
            setSections(data)
        }
        fetchSections()
    }, [course])

    useEffect(() => {
        updateParentList(selectedList)
    }, [selectedList])



    function handleDepChange(dep) {
        console.log(dep)
        setDep(dep)
    }

    function handleCourseChange(course) {
        console.log(course)
        setCourse(course)
    }

    function handleAddNewItem(event) {
        const metadata = event.target.dataset
        const selectedDep = metadata.dep
        const selectedNum = metadata.num
        const selectedSection = metadata.section

        console.log('add ' + selectedDep.toUpperCase() + selectedNum.toUpperCase() + ' ' + selectedSection.toUpperCase())

        var modifiedList = [...selectedList]
        if(!modifiedList.find(item => {
            return item.dep === selectedDep && item.num === selectedNum && item.section === selectedSection
        })) {
            modifiedList.push({ dep: selectedDep, num: selectedNum, section: selectedSection, new_item: true, keep: true })
            setSelectedList(modifiedList)
        }
    }

    // removes items from list of added sections (if not new item, moves item to removed items)
    function handleRemoveItem(event) {
        console.log(event.target.id)
        const targetIndex = event.target.id

        if(event.target.dataset.newItem === 'false') {
            const modifiedList = [...selectedList]
            modifiedList[targetIndex].keep = false
            setSelectedList(modifiedList)
        }else {
            const newSelectedList = selectedList.filter((item, index) => {return index.toString() !== targetIndex })
            setSelectedList(newSelectedList)
        }
    }

    // puts item back into list of added sections
    function handleKeepItem(event) {
        console.log('Put this item back into added list')
        const targetIndex = event.target.id
        const modifiedList = [...selectedList]
        modifiedList[targetIndex].keep = true
        setSelectedList(modifiedList)
    }


    return (
        <div className="course-selector">
            <div className="controllers">
                <p><span>{term}{year}</span></p>
                
                <label htmlFor="depSelect">Department</label>
                <Select
                    onChange={handleDepChange}
                    name="dep-select"
                    options={deps}
                    id="depSelect"
                />

                <label htmlFor="courseSelect">Course number</label>
                <Select
                    onChange={handleCourseChange}
                    name="dep-select"
                    options={courses}
                    value={course}
                    id="courseSelect"
                />
            </div>
            <div className="course-list">
                <section className="list available-courses">
                    <h4>Available sections</h4>
                    <ul>
                        {sections.map((item, index) => (
                            <li 
                                key={index} 
                                id={index} 
                                data-dep={item.dep} 
                                data-num={item.num} 
                                data-section={item.section} 
                                onClick={handleAddNewItem}>
                                    {(item.dep + item.num).toUpperCase()} {item.section.toUpperCase()}
                            </li>
                        ))}
                    </ul>
                </section>
                <section className="selected-courses">
                    <section className="list added-courses">
                        <h4>Added sections</h4>
                        <ul>
                            {selectedList.map((item, index) => (
                                item.keep === true && 
                                <li 
                                    key={index} 
                                    id={index} 
                                    data-dep={item.dep} 
                                    data-num={item.num} 
                                    data-section={item.section} 
                                    data-new-item={item.new_item}
                                    onClick={handleRemoveItem} >
                                        {(item.dep + item.num).toUpperCase()} {item.section.toUpperCase()} {item.new_item && <strong>New!</strong>}
                                </li>
                            ))}
                        </ul>
                    </section>
                    {!setup && 
                    <section className="list removed-courses">
                        <h4>Removed courses</h4>
                        <ul>
                            {selectedList.map((item, index) => (
                                item.keep === false && 
                                <li 
                                    key={index} 
                                    id={index} 
                                    data-dep={item.dep} 
                                    data-num={item.num} 
                                    data-section={item.section} 
                                    data-new-item={item.new_item}
                                    onClick={handleKeepItem} >
                                        {(item.dep + item.num).toUpperCase()} {item.section.toUpperCase()}
                                </li>
                            ))}
                        </ul>
                    </section>
                    }
                </section>
            </div>

        </div>
    )
}