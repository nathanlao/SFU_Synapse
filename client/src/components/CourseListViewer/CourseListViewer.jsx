import React, { useEffect, useState } from "react"
import './CourseListViewer.css'


export default function CourseListViewer({year, term}) {

    const [list, setList] = useState([])
    const [dep, setDep] = useState('') // department (cmpt)
    const [num, setNum] = useState('') // course number (372)

    const viewLevel = { deps: 0, courses: 1, sections: 2 }


    useEffect(() => {
        if(dep !== '') {
            if(num !== '') {
                getData(viewLevel.sections)
            }else {
                getData(viewLevel.courses)
            }
        }else {
            getData(viewLevel.deps)
        }
        // eslint-disable-next-line
    }, [year, term, dep, num])


    function getBody(level) {
        if(level === viewLevel.courses) {
            return JSON.stringify({ year: year, term: term, dep: dep })
        }else if(level === viewLevel.sections) {
            return JSON.stringify({ year: year, term: term, dep: dep, num: num })
        }else {
            return JSON.stringify({ year: year, term: term })
        }
    }
    
    function handleError(level) {
        if(level === viewLevel.courses) {
            alert('404 Department Not Found')
            setDep('')
        }else if(level === viewLevel.sections) {
            alert('404 Section Not Found')
            setNum('')
        }else {
            window.alert('Something went wrong.. Please try again.')
        }
    }

    function getData(level) {
        const body = getBody(level)
        const options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: body
        }

        fetch('http://localhost:3000/admin', options).then(res => {
            if(res.status === 200) {
                res.json().then(data => {
                    setList(data)
                })
            }else {
                handleError(level)
            }
        })
    }


    function handleListItemClick(event) {
        if(dep === '') {
            setDep(event.currentTarget.id)
        }else if(num === '') {
            setNum(event.currentTarget.id)
        }
    }

    function handleBackBtnClick() {
        if(num !== '') {
            setNum('')
        }else {
            setDep('')
        }
    }


    
    function handleBtnClicked(event) {
        event.stopPropagation()

        const li = event.currentTarget.parentElement
        const dataset = li.dataset
        const status = Number(event.currentTarget.dataset.status)

        if(li) {

            if(num !== '') {
                // add, remove a section

                if(status === 0) {
                    console.log('ADD SECTION for ' + dep + dataset.num + ' ' + li.id)
                    addCourse(dataset.num, li.id, dataset.title)
                }else {
                    console.log('REMOVE SECTION ' + dep + dataset.num + ' ' + li.id)
                    if(window.confirm('Confirm removal of ' + dep.toUpperCase() + (dataset.num).toUpperCase() + ' ' + li.id.toUpperCase() + '. This will result in all data related to this section being deleted.')) {
                        console.log('Deleting section')
                        deleteCourse(dataset.num, li.id)
                    }
                    
                }
            }else if(dep !== '') {
                // add all, remove all sections
        
                if(status === 0) {
                    addCourse(li.id, '', '')
                }else {
                    // make db delete query for all records with (year, term, dep, num)
                    if(window.confirm('Confirm removal of all sections in ' + dep.toUpperCase() + li.id.toUpperCase() + '. This will result in all data related to all of the sections being deleted.')) {
                        console.log('Deleting all sections')
                        deleteCourse(li.id, '')
                    }
                    
                    // if response if yes then delete from database
                }
            }
        }
    }

    function deleteCourse(coursenum, coursesection) {
        if(coursesection !== '') {
            // post request to the server
            const options = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ year: year, term: term, dep: dep, num: coursenum, section: coursesection})
            }
    
            fetch('http://localhost:3000/admin/delete-section', options).then(res => {
                if(res.status === 200) {
                    res.json().then(data => {
                        console.log(data)
                        // TODO: force rerender to update view
                    })
                }
            })
        }else if(coursenum !== '') {
            // post request to the server
            const options = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ year: year, term: term, dep: dep, num: coursenum })
            }
            
            fetch('http://localhost:3000/admin/delete-course', options).then(res => {
                if(res.status === 200) {
                    res.json().then(data => {
                        console.log(data)
                        // TODO: force rerender to update view
                    })
                }
            })
        }

    }

    function addCourse(coursenum, coursesection, coursetitle) {
        if(coursesection !== '') {
            // post request to the server
            const options = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ year: year, term: term, dep: dep, num: coursenum, section: coursesection, title: coursetitle })
            }

            fetch('http://localhost:3000/admin/add-section', options).then(res => {
                if(res.status === 200) {
                    res.json().then(data => {
                        console.log(data)
                        // TODO: force rerender to update view
                    })
                }
            })
        }else if(coursenum !== '') {
            // post request to the server
            const options = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ year: year, term: term, dep: dep, num: coursenum })
            }
            
            fetch('http://localhost:3000/admin/add-course', options).then(res => {
                if(res.status === 200) {
                    res.json().then(data => {
                        console.log(data)
                        // TODO: force rerender to update view
                    })
                }
            })
        }
    }



    return (
        <div className="course-list-viewer">
            <p>/{dep}{num !== '' && '/' + num}</p>

            {dep !== '' && <button onClick={handleBackBtnClick} id="backBtn" type="button">Back</button>}
            
            <ul>
                {list.map((item, index) => (
                    <li key={index} id={item.value} onClick={handleListItemClick} data-num={num} data-title={item.title}>
                        <span>{dep.toUpperCase()}{num.toUpperCase()} {item.value.toUpperCase()} {item.title}</span>
                        {/* buttons under view level: list of sections */}
                        {dep !== '' && num !== '' && item.status === 0 && <button data-status={item.status} className="add-btn" onClick={handleBtnClicked}>Add</button>}
                        {dep !== '' && num !== '' && item.status === 1 && <button data-status={item.status} className="add-btn" onClick={handleBtnClicked}>Remove</button>}
                        {/* buttons under view level: list of courses */}
                        {dep !== '' && num === '' && item.status === 0 && <button data-status={item.status} className="add-all-btn add-btn" onClick={handleBtnClicked}>Add all sections</button>}
                        {dep !== '' && num === '' && item.status === 1 && <button data-status={item.status} className="remove-btn add-btn" onClick={handleBtnClicked}>Remove all sections</button>}
                        {dep !== '' && num === '' && item.status === 2 && <button data-status={item.status} className="modify-btn add-btn" onClick={handleListItemClick}>Modify added sections</button>}
                    </li>
                ))}
            </ul>
        </div>
    )
}