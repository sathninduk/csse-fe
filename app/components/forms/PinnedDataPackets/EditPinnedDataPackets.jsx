import {Button} from "@nextui-org/react";
import Input from "@/app/components/Input";
import React from "react";
import {Form, message} from "antd";
import schema from "@/app/validaitions/AddPinnedDataPacketValidation";
import FormItem from "antd/es/form/FormItem";
import {updatePinnedDataPacket} from "@/services/PinnedDataPacketsService";

const EditPinnedDataPacketForm = ({...props}) => {

    // state
    const [saving, setSaving] = React.useState(false);
    const [error, setError] = React.useState({});
    const [name, setName] = React.useState(props.id);
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
    const updateWebpage = async () => {

        // set saving
        setSaving(true);

        try {
            // data // TODO: add/change fields
            const data = {name, folder, data: packetData};

            // validate
            await schema.validate(data, {abortEarly: false});

            // add webpage // TODO: change the function
            await updatePinnedDataPacket(data, props.web_id).then((response) => {
                Message("success", "Packet Updated") // backend validation error
                // props.notificationMessage("success", "Record added"); // refresh data with success message
                // props.onClose(); // close modal
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

                    <div className={"hidden"}>
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
                                value={props.id ? props.id : name}
                                disabled={props.id}
                                onChange={(e) => setName(e.target.value)}
                                status={error.name ? "error" : ""}
                                error={error.name}
                            />
                        </FormItem>
                    </div>

                    <div className={"mb-4"}>
                        <p className={"text-gray-400 text-sm"}>Folder: {props.folder_id}</p>
                        <p className={"text-gray-400 text-sm"}>Name: {props.id}</p>
                    </div>

                    <FormItem>
                        <Input
                            label={"Data"}
                            type="text" placeholder="Enter your new data"
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
                        updateWebpage().then(() => {
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

export default EditPinnedDataPacketForm;