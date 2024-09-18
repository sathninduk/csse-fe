"use client"
import { Button } from "@nextui-org/react";
import Input from "@/app/components/Input";
import React from "react";
import {Form, message, Select} from "antd";
import FormItem from "antd/es/form/FormItem";
import { CreateNewAlert } from "@/services/AlertService";
import { Dropdown } from 'antd';;
import { Radio } from 'antd';
import { useParams } from "next/navigation";
import alertValidation from "@/app/validaitions/AlertValidation";





const CreateAlertForm = ({ ...props }) => {


    const { webId } = useParams();

    // state
    const [saving, setSaving] = React.useState(false);
    const [error, setError] = React.useState({});
    // const [name, setName] = React.useState("");
    // const [path, setPath] = React.useState("");
    // const [webId, setWebId] = React.useState("");
    const [Threshold, setThreshold] = React.useState();
    const [Subject, setSubject] = React.useState("");
    const [Content, setContent] = React.useState("");
    const [AlertOn, setAlertOn] = React.useState("Immediate");



    // backend validation error message
    const [messageApi, contextHolder] = message.useMessage(); // message api
    const Message = (type, message) => { // message function
        messageApi.open({
            type: type,
            content: message,
        });
    };


    // add webpage function
    const AddAlert = async () => {

        // set saving
        setSaving(true);

        try {
            // data // TODO: add/change fields
            const data = { Threshold, Subject, Content, AlertOn,webId };

            // validate
            await alertValidation.validate(data, { abortEarly: false });

            // add webpage // TODO: change the function
            await CreateNewAlert(data).then((response) => {
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
                        <label className="text-xs" htmlFor="">Type</label>
                        <br />

                        <Radio.Group buttonStyle="solid" onChange={(e) => setAlertOn(e.target.value)} // added this line
                                     value={AlertOn} // added this line
                                     status={error.AlertOn ? "error" : ""} // added this line
                                     error={error.AlertOn} // added this line
                        >

                            <Radio.Button value={"Cognitive Complexity"}>Cognitive Complexity</Radio.Button>
                            <Radio.Button value={"Formal Specifications"}>Formal Specifications</Radio.Button>

                        </Radio.Group>
                    </FormItem>
                    <FormItem>
                        <Input
                            label={"Alert Threshold"}
                            type="number" placeholder="Alert Threshold"
                            value={Threshold}
                            onChange={(e) => setThreshold(parseInt(e.target.value))}
                            status={error.Threshold ? "error" : ""}
                            error={error.Threshold}
                        />
                    </FormItem>
                    <FormItem>
                        <Input
                            label={"Alert Subject"}
                            type="text" placeholder="Alert Subject"
                            value={Subject}
                            onChange={(e) => setSubject(e.target.value)}
                            status={error.Subject ? "error" : ""}
                            error={error.Subject}
                        />
                    </FormItem>

                    <FormItem>
                        <Input
                            label={"Alert Content"}
                            type="text" placeholder="Alert Content"
                            value={Content}
                            onChange={(e) => setContent(e.target.value)}
                            status={error.Content ? "error" : ""}
                            error={error.Content}
                        />
                    </FormItem>

                    <br />
                    <br />




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
                            AddAlert().then(() => {
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

export default CreateAlertForm;