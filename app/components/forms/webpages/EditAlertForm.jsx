import {Button} from "@nextui-org/react";
import Input from "@/app/components/Input";
import React, {useEffect} from "react";
import {EditAlertPage, GetAlertbyId} from "@/services/AlertService";
import {Form, message} from "antd";
import schema from "@/app/validaitions/WebPageEditValidation";
import FormItem from "antd/es/form/FormItem";
import { Dropdown } from 'antd';;
import { Radio } from 'antd';


const items = [
    {
        key: '1',
        label:
            "Daily",
    },
    {
        key: '2',
        label:
            "Weekly"
        ,
    },
    {
        key: '3',
        label:
            "Monthly"
        ,
    },
];
const EditAlertForm = ({...props}) => {

    // state
    const [saving, setSaving] = React.useState(false);
    const [error, setError] = React.useState({});
    const [Threshold, setThreshold] = React.useState();
    const [Subject, setSubject] = React.useState("");
    const [Content, setContent] = React.useState("");
    const [AlertOn, setAlertOn] = React.useState();
    const [Repeat, setRepeat] = React.useState();

    // backend validation error message
    const [messageApi, contextHolder] = message.useMessage(); // message api
    const Message = (type, message) => { // message function
        messageApi.open({
            type: type,
            content: message,
        });
    };

    // edit webpage function
    const editWebpage = async () => {

        // set saving
        setSaving(true);

        try {
            // data // TODO: add/change fields
            const data = {

                Threshold: Threshold,
                Subject: Subject,
                Content: Content,
                AlertOn: AlertOn,
                Repeat: Repeat

            };

            // validate
            //await schema.validate(data, {abortEarly: false});

            // edit webpage // TODO: change the function
            await EditAlertPage(props.id, data).then(() => {
                props.refreshData("success", "Saved"); // refresh data with success message
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

    // get webpage by id
    useEffect(() => {
        // get webpage by id from backend function
        GetAlertbyId(props.id).then((response) => {
            console.log(response);
            setThreshold(response.alert_threshold);
            setSubject(response.alert_subject);
            setContent(response.alert_content);
            setAlertOn(response.when_alert_required);
            setRepeat(response.when_alert_required);
        }).then(() => {
        });
    }, []);

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
                            status={error.name ? "error" : ""}
                            error={error.name}
                        />
                    </FormItem>
                    <FormItem>
                        <Input
                            label={"Alert Subject"}
                            type="text" placeholder="Alert Subject"
                            value={Subject}
                            onChange={(e) => setSubject(e.target.value)}
                            status={error.path ? "error" : ""}
                            error={error.path}
                        />
                    </FormItem>
                    <FormItem>
                        <Input
                            label={"Alert Content"}
                            type="text" placeholder="Alert Content"
                            value={Content}
                            onChange={(e) => setContent(e.target.value)}
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
                        editWebpage().then(() => {
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

export default EditAlertForm;