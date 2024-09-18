import {Button} from "@nextui-org/react";
import Input from "@/app/components/Input";
import React from "react";
import {Form, message} from "antd";
import schema from "@/app/validaitions/WebPageAddValidation";
import FormItem from "antd/es/form/FormItem";
import {AddWebpage} from "@/services/WebpagesService";

const AddWebpageForm = ({...props}) => {

    // state
    const [saving, setSaving] = React.useState(false);
    const [error, setError] = React.useState({});
    const [name, setName] = React.useState("");
    const [path, setPath] = React.useState("");
    const [webId, setWebId] = React.useState("");

    // backend validation error message
    const [messageApi, contextHolder] = message.useMessage(); // message api
    const Message = (type, message) => { // message function
        messageApi.open({
            type: type,
            content: message,
        });
    };


    // add webpage function
    const addWebpage = async () => {

        // set saving
        setSaving(true);

        try {
            // data // TODO: add/change fields
            const data = {name, path, webId};

            // validate
            await schema.validate(data, {abortEarly: false});

            // add webpage // TODO: change the function
            await AddWebpage(data).then((response) => {
                props.notificationMessage("success", "Record added"); // refresh data with success message
                props.onClose(); // close modal
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

    return (
        <>
            {contextHolder}
            <Form>
                <div>
                    {/* TODO: Change the form */}
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
                            label={"Path"}
                            type="text" placeholder="Webpage path"
                            value={path}
                            onChange={(e) => setPath(e.target.value)}
                            status={error.path ? "error" : ""}
                            error={error.path}
                        />
                    </FormItem>
                    <FormItem>
                        <Input
                            label={"Web ID"}
                            type="text" placeholder="Web ID"
                            value={webId}
                            onChange={(e) => setWebId(e.target.value)}
                            status={error.webId ? "error" : ""}
                            error={error.webId}
                        />
                    </FormItem>
                </div>

                <div className={"mt-6 mb-3 flex gap-3 justify-end"}>

                    {/* close button */}
                    <Button color="danger" variant="flat" onPress={props.onClose}>
                        Close
                    </Button>

                    {/* save button */}
                    <Button
                        disabled={saving}
                        color="primary" variant="flat" onPress={() => {
                        addWebpage().then(() => {
                            setSaving(false);
                        });
                    }}>
                        {saving ? "Saving..." : "Save"}
                    </Button>

                </div>
            </Form>
        </>
    );
}

export default AddWebpageForm;