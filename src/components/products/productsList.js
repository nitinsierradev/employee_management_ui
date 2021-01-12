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
            data: item,
            action: action,
            title: title
        }
        setData(updatedObj);
        // setAction(action);
    }

    const onChangeProduct = e => {
        let data = objData.data;
        data[e.target.name] = e.target.value;
        setData(prevState => {
            return { ...prevState, data:data }
          });
        
    }
    const saveProduct = e => {
        e.preventDefault();
        let item = objData.data;
        if(!item.id && item.name){
           createProject({variables:{name: item.name}}).then(response => {
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
           .catch(err =>{
           //handle error
          });
           
        } else if(item.id && item.name){
            updateProject({variables:{id:item.id, name: item.name}}).then(response => {
             setDialog(false, 'read', {});
                let updateItem = response.data.createProject.project;
             })
            .catch(err =>{
            //handle error
           });
            
         }
    }
    if(!loading && !error && data && data.allProject){
        setTimeout(()=>{
            setDataList(data.allProject);
        }, 100)
        
    }
    const manageDateFormat = d => {
        let dt = new Date(d);
        return dt.getDate() + "-" + (dt.getMonth() + 1) + "-" + dt.getFullYear();
    }
    return (
        <Card>
            <div>
                <Button intent="primary" icon="add" text="Add Product" className="float-right" onClick={() => setDialog(true, 'add', {})}/>
            </div>
            <table class="bp3-html-table bp3-html-table-bordered bp3-html-table-condensed bp3-html-table-striped ">
                <thead>
                    <tr>
                        <th>S.No.</th>
                        <th>Name</th>
                        <th>Created Date</th>
                        <th>Edit</th>
                    </tr>
                </thead>
                <tbody>
                    {dataList.map((item, idx) => <tr key={item.id}><td>{idx + 1}</td><td>{item.name}</td><td>{manageDateFormat(item.addedDate)}</td><td><Icon icon="edit" onClick={() => setDialog(true, "edit", item)} /></td></tr>)}
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
                    <ul>
                        <li>
                            <label>Name</label> <input name="name" value={objData.data.name} onChange={onChangeProduct} />
                        </li>
                        
                    </ul>
                    <Button text="Save" onClick={saveProduct}/>
                </div>
            </Dialog>

        </Card>
    )
}

export default React.memo(ProductList);