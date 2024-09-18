"use client";

import AddBillingProfileForm from "@/app/components/forms/Billing/AddBillingProfileForm";
import EditBillingProfileForm from "@/app/components/forms/Billing/EditBillingProfileForm";
import {useEffect, useState} from "react";
import {CheckBillingProfileCount} from "@/services/BillingService";

export default function Billing({ params }) {

    const [billingProfileExists, setBillingProfileExists] = useState(false);

    useEffect(() => {
        CheckBillingProfileCount(params.webId).then(r => {
            if (r > 0) {
                setBillingProfileExists(true);
            }
        });
    }, [params.webId]);

    return (
        billingProfileExists ? <EditBillingProfileForm webid={params.webId} /> : <AddBillingProfileForm webid={params.webId} />
        // <SubscriptionPlans/>
    );
}



