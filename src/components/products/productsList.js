import React, { useState } from "react";
import { useQuery, useMutation } from "react-apollo";

import { Icon, Dialog, Classes, Button, Code, H5, Intent, Switch, Tooltip, Card } from "@blueprintjs/core";
import { IconNames } from "@blueprintjs/icons";

import { QUERY_PRODUCTS, MUTATION_ADD_PRODUCT, MUTATION_UPDATE_PRODUCT } from "../../core/queries";
import { isOpen } from "@blueprintjs/core/lib/esm/components/context-menu/contextMenu";

const ProductList = () => {
    const initialVal = {
        isOpen: false,
        data: {},
        action: "read",
        title: "Add Product"
    }

    const phases = { "PI": "Project Initiation", "PP": 'Project Planning', "PE": 'Project Execution', "PMC": 'Project Monitoring and Control', "PC": 'Project Closed' };

    const [objData, setData] = useState(initialVal);
    const [dataList, setDataList] = useState([]);
    const [createProject, projectData] = useMutation(MUTATION_ADD_PRODUCT);
    const [updateProject, updateProjectData] = useMutation(MUTATION_UPDATE_PRODUCT);
    const { loading, data, error } = useQuery(QUERY_PRODUCTS);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;

    const setDialog = (isOpen, action, item) => {
        let title = action == "edit" ? "Edit Project" : "Add Project";
        let updatedObj = {
            isOpen: isOpen,
            data: { ...item },
            action: action,
            title: title
        }
        if(updatedObj.data.estimatedDate){
            updatedObj.data.estimatedDate = new Date(updatedObj.data.estimatedDate);
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
    const saveProduct = e => {
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
                setDialog(false, 'read', {});
                let createItem = response.data.createProject.project;
                let tempItem = {
                    id: createItem.id,
                    name: createItem.name,
                    addedDate: createItem.addedDate
                };
                // let dList = dataList;
                data.allProject.push(tempItem);
                // setDataList(data.allProject);
            })
                .catch(err => {
                    //handle error
                });

        } else if (item.id && item.name) {
            reqData["id"] = item.id;
            updateProject({ variables: reqData }).then(response => {
                setDialog(false, 'read', {});
                let updateItem = response.data.createProject.project;
            })
                .catch(err => {
                    //handle error
                });

        }
    }
    if (!loading && !error && data && data.allProject) {
        setTimeout(() => {
            setDataList(data.allProject);
        }, 100)

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
        <Card>
            <div>
                <Button intent="primary" icon="add" text="Add Product" className="float-right" onClick={() => setDialog(true, 'add', {})} />
            </div>
            <table class="bp3-html-table bp3-html-table-bordered bp3-html-table-condensed bp3-html-table-striped ">
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
                        <td><Icon icon="edit" onClick={() => setDialog(true, "edit", item)} /></td>
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
            >
                <div className={Classes.DIALOG_BODY}>
                    <div class="bp3-form-group bp3-inline">
                        <label className="bp3-label" for="name">
                            Name
                            <span className="bp3-text-muted">(required)</span>
                        </label>
                        <div className="bp3-form-content">
                            <div className="bp3-input-group">

                                <input id="name" name="name" type="text" className="bp3-input"
                                    placeholder="Placeholder text" value={objData.data.name} onChange={onChangeProject} />
                            </div>

                        </div>
                    </div>
                    <div class="bp3-form-group bp3-inline">
                        <label className="bp3-label" for="phase">
                            Phase
                            <span className="bp3-text-muted">(required)</span>
                        </label>
                        <div className="bp3-form-content">
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
                        <label className="bp3-label" for="estimatedDate">
                            Estimated Date
                            <span className="bp3-text-muted">(required)</span>
                        </label>
                        <div className="bp3-form-content">
                            <div className="bp3-input-group">
                                <input id="estimatedDate" name="estimatedDate" type="date" className="bp3-input"
                                    placeholder="Placeholder text" value={objData.data.estimatedDate} onChange={onChangeProject} />
                            </div>
                            <div className="bp3-form-helper-text">(mm/dd/yyyy)</div>
                        </div>
                    </div>
                    <div class="bp3-form-group bp3-inline">
                        <label className="bp3-label" for="description">
                            Description
                            <span className="bp3-text-muted">(required)</span>
                        </label>
                        <div className="bp3-form-content">
                            <div className="bp3-input-group">
                                <textarea id="description" name="description" value={objData.data.description} onChange={onChangeProject}></textarea>
                            </div>
                        </div>
                    </div>
                    <div>
                        <Button intent="primary" className="float-right" text="Save" onClick={saveProduct} />
                    </div>

                </div>
            </Dialog>
        </Card>
    )
}

export default React.memo(ProductList);