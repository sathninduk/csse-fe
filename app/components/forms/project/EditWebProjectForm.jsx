import {Button} from "@nextui-org/react";
import Input from "@/app/components/Input";
import React, {useEffect} from "react";
import {Form, message, Select} from "antd";
import schema from "@/app/validaitions/SiteEditValidation";
import FormItem from "antd/es/form/FormItem";
import {EditSiteService, GetSiteByIdService} from "@/services/SitesService";

const {Option} = Select;

const EditWebProjectForm = ({...props}) => {

    // state
    const [saving, setSaving] = React.useState(false);
    const [error, setError] = React.useState({});

    const [name, setName] = React.useState("");
    const [domain, setDomain] = React.useState("");
    const [description, setDescription] = React.useState("");
    const [category, setCategory] = React.useState("");

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

    // edit webpage function
    const editSite = async () => {

        // set saving
        setSaving(true);

        try {
            // data // TODO: add/change fields
            const data = {name: name, description: description, category: category};

            // validate
            await schema.validate(data, {abortEarly: false});

            // edit webpage // TODO: change the function
            await EditSiteService(props.webId, data).then(() => {
                // props.refreshData("success", "Record updated"); // refresh data with success message
                Message("success", "Project updated");
                // props.onClose(); // close modal
                // router.push(`/u`);
                window.location.href = "/u";
            }).then((error) => {
                Message("error", error.response.data.error) // backend validation error
            });

        } catch (validationError) {
            // set error
            let errorsObject = {}
            validationError.errors && validationError.errors.map(obj => errorsObject[Object.keys(obj)[0]] = Object.values(obj)[0]);
            setError(errorsObject);
        }

    }

    // get webpage by id
    useEffect(() => {
        // get webpage by id from backend function
        GetSiteByIdService(props.webId).then((response) => {
            setName(response.name);
            setDomain(response.domain);
            setDescription(response.description);
            setCategory(response.category);
        }).catch((error) => {
            Message("error", error.response.data.error);
        });
    }, []);

    return (
        <>
            {contextHolder}
            <Form>
                <div>
                    {/* TODO: Change the form */}
                    <FormItem>
                        <h1 className={"text-gray-500"}>Repository: {domain}</h1>
                    </FormItem>
                    <FormItem>
                        <Input
                            label={"Name"}
                            type="text" placeholder="Webpage name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            status={error.name ? "error" : ""}
                            error={error.name}
                        />
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
                                value={category} // Use value instead of defaultValue
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
                        editSite().then(() => {
                            setSaving(false);
                        });
                    }}>
                        {saving ? "Updating..." : "Update"}
                    </Button>

                </div>
            </Form>
        </>
    );
}

export default EditWebProjectForm;