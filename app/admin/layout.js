import PanelLayout from "@/app/layouts/PanelLayout";

export default function AdminLayout({ children }) {
    return (
        <div>
            <PanelLayout childrenBody={children}/>
        </div>
    );
}