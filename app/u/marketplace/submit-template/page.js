import AddTemplateForm from "@/app/components/forms/marketplace/AddTemplateForm";

// This is the page that is shown when the user wants to add a new template
export default function AddTemplate(){
    return (
        <div className="bg-secondaryDark p-6 rounded-lg">
            <h1 className="text-large font-bold text-light dark:text-dark">Add New Template</h1><br/>
            <AddTemplateForm/>
        </div>
    );
}