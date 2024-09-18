"use client"

import {Button} from "@nextui-org/react";
import Input from "@/app/components/Input";
import React, {useEffect} from "react";
import {Form, message, Select} from "antd";
import schema from "@/app/validaitions/SiteAddValidation";
import FormItem from "antd/es/form/FormItem";
import {AddSiteService} from "@/services/SitesService";
import {GetGitHubRepository} from "@/services/GitHubService";

const {Option} = Select;

const AddWebProjectForm = ({...props}) => {

    // state
    const [saving, setSaving] = React.useState(false);
    const [error, setError] = React.useState({});

    const [name, setName] = React.useState("");
    const [domain, setDomain] = React.useState("");
    const [repo, setRepo] = React.useState([]);
    const [description, setDescription] = React.useState("");
    const [category, setCategory] = React.useState("");
    const [loadRepo, setLoadRepo] = React.useState(true);

    // backend validation error message
    const [messageApi, contextHolder] = message.useMessage(); // message api
    const Message = (type, message) => { // message function
        messageApi.open({
            type: type,
            content: message,
        });
    };

    const handleChange = (value) => {
        setCategory(value); // Pass the selected value to the parent component
    };

    const handleRepoChange = (value) => {
        setDomain(value); // Pass the selected value to the parent component
    };

    // add webpage function
    const addSite = async () => {

        // set saving
        setSaving(true);

        try {
            // data // TODO: add/change fields
            const data = {name, domain, description, category};

            // validate
            await schema.validate(data, {abortEarly: false});

            // add webpage // TODO: change the function
            await AddSiteService(data).then((response) => {
                // props.notificationMessage("success", "Record added"); // refresh data with success message
                Message("success", "Project created");
                // props.onClose(); // close modal
                // push to the next page
                // router.push(`/u`);

                // redirect after 2 seconds
                setTimeout(() => {
                    document.location.href = "/u";
                }, 1500);

            }).then((error) => {
                Message("error", error.response.data.error) // backend validation error
            });

        } catch (validationError) {
            console.log(validationError.errors)
            // set error
            let errorsObject = {}
            validationError.errors && validationError.errors.map(obj => errorsObject[Object.keys(obj)[0]] = Object.values(obj)[0]);
            setError(errorsObject);
        }

    }

    useEffect(() => {
        setRepo([]);
        setLoadRepo(true);
        GetGitHubRepository().then((response) => {
            if (response.repos !== "No results found") {
                setRepo(response.repos);
            }
            setLoadRepo(false);
        });
    }, []);

    return (
        <>
            {contextHolder}
            <Form>
                <div>
                    {/* TODO: Change the form */}
                    <FormItem>
                        <Input
                            label={"Name"}
                            type="text" placeholder="Project name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            status={error.name ? "error" : ""}
                            error={error.name}
                        />
                    </FormItem>
                    <FormItem>
                        {/*<Input*/}
                        {/*    label={"Domain"}*/}
                        {/*    type="text" placeholder="Domain"*/}
                        {/*    value={domain}*/}
                        {/*    onChange={(e) => setDomain(e.target.value)}*/}
                        {/*    status={error.domain ? "error" : ""}*/}
                        {/*    error={error.domain}*/}
                        {/*/>*/}
                        <div style={{width: '100%', maxWidth: '400px', margin: '0 auto'}}>

                            <div className="flex justify-between items-center">
                                <div>
                                    <label>Repository</label>
                                </div>
                                <div>
                                    {loadRepo && <span className={"text-xs text-gray-400"}>Loading...</span>}
                                </div>
                            </div>

                            <Select
                                getPopupContainer={(node) => node.parentNode}
                                className='mt-2'
                                allowClear
                                placeholder={"Select repository"}
                                // value={domain}
                                onChange={handleRepoChange}
                                status={error.domain ? "error" : ""}
                                error={error.domain}
                                style={{width: '100%'}}
                                disabled={loadRepo}
                                loading={loadRepo}
                            >
                                {repo.length > 0 &&
                                    repo.map((item, index) => (
                                        <Option key={index} value={item}>{item}</Option>
                                    ))
                                }
                            </Select>
                            {error.domain &&
                                <span className={"mt-2 text-danger text-xs"}>{error.domain} <br/> </span>
                            }
                        </div>
                    </FormItem>
                    <FormItem>
                        <Input
                            label={"Description"}
                            type="text" placeholder="Description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            status={error.description ? "error" : ""}
                            error={error.description}
                        />
                    </FormItem>
                    <FormItem>
                        <div style={{width: '100%', maxWidth: '400px', margin: '0 auto'}}>
                            <label>Category</label>
                            <Select
                                getPopupContainer={(node) => node.parentNode}
                                className='mt-2'
                                allowClear
                                placeholder={"Select category"}
                                // value={category} // Use value instead of defaultValue
                                onChange={handleChange} // Call handleChange function
                                style={{width: '100%'}}
                                status={error.category ? "error" : ""}
                            >
                                <Option value={"Operating System (OS)"}>Operating System (OS)</Option>
                                <Option value={"Application Software"}>Application Software</Option>
                                <Option value={"Database Management Software (DBMS)"}>Database Management Software (DBMS)</Option>
                                <Option value={"Web Browser"}>Web Browser</Option>
                                <Option value={"Military Software"}>Military Software</Option>
                                <Option value={"Aviation Software"}>Aviation Software</Option>
                                <Option value={"Communication Software"}>Communication Software</Option>
                                <Option value={"Healthcare Software"}>Healthcare Software</Option>
                                <Option value={"Enterprise Resource Planning (ERP)"}>Enterprise Resource Planning (ERP)</Option>
                                <Option value={"Customer Relationship Management (CRM)"}>Customer Relationship Management (CRM)</Option>
                                <Option value={"Project Management Software"}>Project Management Software</Option>
                                <Option value={"Content Management System (CMS)"}>Content Management System (CMS)</Option>
                                <Option value={"Development Software (IDE)"}>Development Software (IDE)</Option>
                                <Option value={"Graphics and Design Software"}>Graphics and Design Software</Option>
                                <Option value={"Accounting Software"}>Accounting Software</Option>
                                <Option value={"Communication Software"}>Communication Software</Option>
                                <Option value={"Virtualization Software"}>Virtualization Software</Option>
                                <Option value={"Cyber Security Application"}>Cyber Security Application</Option>
                                <Option value={"Other"}>Other</Option>
                            </Select>
                            {error.category &&
                                <span className={"mt-2 text-danger text-xs"}>{error.category} <br/> </span>
                            }
                        </div>
                    </FormItem>
                </div>

                <div className={"mt-6 mb-3 flex gap-3 justify-end"}>

                    {/* save button */}
                    <Button
                        disabled={saving}
                        color="primary" variant="flat" onPress={() => {
                        addSite().then(() => {
                            setSaving(false);
                        });
                    }}>
                        {saving ? "Adding..." : "Add"}
                    </Button>

                </div>
            </Form>
        </>
    )
        ;
}

export default AddWebProjectForm;