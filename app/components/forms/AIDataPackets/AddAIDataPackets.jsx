import {Button} from "@nextui-org/react";
import Input from "@/app/components/Input";
import React from "react";
import {Form, message} from "antd";
import schema from "@/app/validaitions/AddPinnedDataPacketValidation";
import FormItem from "antd/es/form/FormItem";
import {AddWebpage} from "@/services/WebpagesService";
import {addPinnedFolders} from "@/services/PinnedDataPacketsService";
import {addAIFolders} from "@/services/AIDataPacketsService";

const AddPinnedDataPacketForm = ({...props}) => {

    // state
    const [saving, setSaving] = React.useState(false);
    const [error, setError] = React.useState({});
    const [name, setName] = React.useState("");
    const [folder, setFolder] = React.useState(props.folder_id);
    const [packetData, setPacketData] = React.useState("");

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
            const data = {name, folder, data: packetData};

            // validate
            await schema.validate(data, {abortEarly: false});

            // add webpage // TODO: change the function
            await addAIFolders(data, props.web_id).then((response) => {
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
                            label={"Folder"}
                            type="text" placeholder="Data packet folder"
                            value={props.folder_id ? props.folder_id : folder}
                            disabled={props.folder_id}
                            onChange={(e) => setFolder(e.target.value)}
                            status={error.folder ? "error" : ""}
                            error={error.folder}
                        />
                    </FormItem>
                    <FormItem>
                        <Input
                            label={"Name"}
                            type="text" placeholder="Data packet name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            status={error.name ? "error" : ""}
                            error={error.name}
                        />
                    </FormItem>
                    <FormItem>
                        <Input
                            label={"Prompt"}
                            type="text" placeholder="Enter your data"
                            value={packetData}
                            onChange={(e) => setPacketData(e.target.value)}
                            status={error.data ? "error" : ""}
                            error={error.data}
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

export default AddPinnedDataPacketForm;