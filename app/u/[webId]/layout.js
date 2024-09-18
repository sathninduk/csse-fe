import PanelLayout from "@/app/layouts/PanelLayout";

export default function ProjectLayout({ children }) {
    return (
        <div>
            <PanelLayout childrenBody={children}/>
        </div>
    );
}