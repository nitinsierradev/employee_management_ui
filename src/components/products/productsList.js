import React, { useState } from "react";
import { useQuery, useMutation } from "react-apollo";

import { Icon, Dialog, Classes, Button, Card } from "@blueprintjs/core";

import { QUERY_PROJECTS, MUTATION_ADD_PROJECT, MUTATION_UPDATE_PROJECT } from "../../core/queries";

const ProjectList = () => {
    const initialVal = {
        isOpen: false,
        data: {},
        action: "read",
        title: "Add Project",
        idx: -1
    }

    const phases = { "PI": "Project Initiation", "PP": 'Project Planning', "PE": 'Project Execution', "PMC": 'Project Monitoring and Control', "PC": 'Project Closed' };

    const [objData, setData] = useState(initialVal);
    const [dataList, setDataList] = useState([]);
    const [createProject, projectData] = useMutation(MUTATION_ADD_PROJECT);
    const [updateProject, updateProjectData] = useMutation(MUTATION_UPDATE_PROJECT);
    const { loading, data, error } = useQuery(QUERY_PROJECTS);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;

    const setDialog = (isOpen, action, item, idx) => {
        let title = action == "edit" ? "Edit Project" : "Add Project";
        let updatedObj = {
            isOpen: isOpen,
            data: { ...item },
            action: action,
            title: title,
            idx: idx
        }
        if(updatedObj.data.estimatedDate){
            let dt = new Date(updatedObj.data.estimatedDate);
            let day = dt.getDate();
            let month = (dt.getMonth() + 1);
            if (day < 10) {
                day = "0" + day
            }
            if (month < 10) {
                month = "0" + month
            }
            updatedObj.data.estimatedDate =  dt.getFullYear() + "-" + month + "-" + day;
            
        }
        setData(updatedObj);
        // setAction(action);
    }

    const onChangeProject = e => {
        let data = { ...objData.data };
        data[e.target.name] = e.target.value;
        setData(prevState => {
            return { ...prevState, data: data }
        });

    }

    const viewPhases = v => {
        if (!v) {
            return phases["PI"];
        } else {

            return phases[v]
        }
    }
    const saveProject = e => {
        e.preventDefault();
        let item = objData.data;
        let reqData = { 
            name: item.name, 
            estimatedDate: item.estimatedDate, 
            phase: item.phase, 
            description: item.description 
        }
        if (!item.id && item.name) {
            
            createProject({ variables: reqData }).then(response => {
                setDialog(false, 'read', {}, -1);
                let createItem = response.data.createProject.project;
                let tempItem = {
                    id: createItem.id,
                    name: createItem.name,
                    addedDate: createItem.addedDate,
                    description: createItem.description,
                    phase: createItem.phase,
                    estimatedDate: createItem.estimatedDate,
                    closedDate: createItem.closedDate
                };
                // let dList = dataList;
                data.allProject.push(tempItem);
                // dList.push(tempItem);
                setTimeout(() => {
                    setDataList(prevState => [...prevState, tempItem]);
                }, 10)
            })
                .catch(err => {
                    //handle error
                });

        } else if (item.id && item.name) {
            reqData["id"] = item.id;
            updateProject({ variables: reqData }).then(response => {
                
                let updateItem = response.data.updateProject.project;
                let tempItem = {
                    id: updateItem.id,
                    name: updateItem.name,
                    addedDate: updateItem.addedDate,
                    description: updateItem.description,
                    phase: updateItem.phase,
                    estimatedDate: updateItem.estimatedDate,
                    closedDate: updateItem.closedDate
                };
                let pData = [...dataList];
                pData[objData.idx] = tempItem;
                setTimeout(() => {
                    setDataList(pData);
                }, 10)
                setDialog(false, 'read', {}, -1);
            })
                .catch(err => {
                    //handle error
                });

        }
    }
    if (!loading && !error && data && data.allProject) {
        setTimeout(() => {
            setDataList(data.allProject);
        }, 0)

    }
    const manageDateFormat = d => {
        if (!d) return "";
        let dt = new Date(d);
        let day = dt.getDate();
        let month = (dt.getMonth() + 1);
        if (day < 10) {
            day = "0" + day
        }
        if (month < 10) {
            month = "0" + month
        }
        return day + "-" + month + "-" + dt.getFullYear();
    }
    return (
        <Card className="parent-div">
            <h3 className="text-align-center">Project List</h3>
            <div className="display-flow-root">
                <Button intent="primary" icon="add" text="Add Project" className="float-right" onClick={() => setDialog(true, 'add', {phase:"PI"}, -1)} />
            </div>
            <table align="center" class="bp3-html-table bp3-html-table-bordered bp3-html-table-condensed bp3-html-table-striped ">
                <thead>
                    <tr>
                        <th>S.No.</th>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Phase</th>
                        <th>Created Date</th>
                        <th>Estimated Date</th>
                        <th>Closed Date</th>
                        <th>Edit</th>
                    </tr>
                </thead>
                <tbody>
                    {dataList.map((item, idx) => (<tr key={item.id}><td>{idx + 1}</td>
                        <td>{item.name}</td>
                        <td>{item.description}</td>
                        <td>{viewPhases(item.phase)}</td>
                        <td>{manageDateFormat(item.addedDate)}</td>
                        <td>{manageDateFormat(item.estimatedDate)}</td>
                        <td>{manageDateFormat(item.closedDate)}</td>
                        <td><Icon icon="edit" onClick={() => setDialog(true, "edit", item, idx)} /></td>
                    </tr>
                    ))}
                </tbody>
            </table>
            <Dialog
                style={{ width: "auto", height: "auto" }}
                icon="application"
                onClose={() => setDialog(false, 'read', {})}
                title={objData.title}
                isOpen={objData.isOpen}
                shouldCloseOnOverlayClickbool={false}
            >
                <div className={Classes.DIALOG_BODY}>
                    <div className="container">
                    <div class="bp3-form-group bp3-inline">
                        <label className="bp3-label col-md-4" for="name">
                            Name
                            <span className="bp3-text-muted">(required)</span>
                        </label>
                        <div className="bp3-form-content col-md-8">
                            <div className="bp3-input-group">

                                <input id="name" name="name" type="text" className="bp3-input"
                                    placeholder="Placeholder text" value={objData.data.name} onChange={onChangeProject} />
                            </div>

                        </div>
                    </div>
                    <div class="bp3-form-group bp3-inline">
                        <label className="bp3-label col-md-4" for="phase">
                            Phase
                            <span className="bp3-text-muted">(required)</span>
                        </label>
                        <div className="bp3-form-content col-md-8">
                            <div className="bp3-input-group">

                                <select id="phase" name="phase" value={objData.data.phase} onChange={onChangeProject}>
                                    <option value="PI">Project Initiation</option>
                                    <option value="PP">Project Planning</option>
                                    <option value="PE">Project Execution</option>
                                    <option value="PMC">Project Monitoring and Control</option>
                                    <option value="PC">Project Closed</option>
                                </select>
                            </div>

                        </div>
                    </div>
                    <div class="bp3-form-group bp3-inline">
                        <label className="bp3-label col-md-4" for="estimatedDate">
                            Estimated Date
                            <span className="bp3-text-muted">(required)</span>
                        </label>
                        <div className="bp3-form-content col-md-8">
                            <div className="bp3-input-group">
                                <input id="estimatedDate" name="estimatedDate" type="date" className="bp3-input"
                                    placeholder="Placeholder text" value={objData.data.estimatedDate} onChange={onChangeProject} />
                            </div>
                            <div className="bp3-form-helper-text">(mm/dd/yyyy)</div>
                        </div>
                    </div>
                    <div class="bp3-form-group bp3-inline">
                        <label className="bp3-label col-md-4" for="description">
                            Description
                            <span className="bp3-text-muted">(required)</span>
                        </label>
                        <div className="bp3-form-content col-md-8">
                            <div className="bp3-input-group">
                                <textarea id="description" name="description" value={objData.data.description} onChange={onChangeProject}></textarea>
                            </div>
                        </div>
                    </div>
                    <div>
                        <Button intent="primary" className="float-right" text="Save" onClick={saveProject} />
                    </div>
                    </div>

                </div>
            </Dialog>
        </Card>
    )
}

export default ProjectList;