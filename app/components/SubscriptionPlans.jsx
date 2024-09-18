// Billing.js
"use client"
import React, {useEffect, useState} from "react";
import {GetSubscriptionPlans, SubscribePlan, UpdateSubscribePlan} from "@/services/BillingService";

export default function SubscriptionPlans({...props}) {
    const [billingInterval, setBillingInterval] = useState('monthly');
    const intervals = ['monthly', 'yearly'];
    const [plans, setPlans] = useState([]);

    const subscribePlan = (id) => {

        if (props.update) {
            UpdateSubscribePlan({project_id: props.web_id, plan_id: id}).then(() => {
                window.location.reload();
            });
        } else {
            SubscribePlan({project_id: props.web_id, plan_id: id}).then(() => {
                window.location.reload();
            });
        }

    }

    useEffect(() => {
        GetSubscriptionPlans().then(r => {
            setPlans(r);
        });
    }, []);

    return (
        <>
            <div className="sm:flex sm:flex-col sm:align-center w-full">
                <div
                    className="relative self-center mt-6 bg-gray-950 rounded-lg p-0.5 flex sm:mt-8 border border-zinc-800">
                    {intervals.map(interval => (
                        <button
                            key={interval}
                            onClick={() => setBillingInterval(interval)}
                            type="button"
                            className={`${
                                billingInterval === interval
                                    ? 'relative w-1/2 bg-zinc-700 border-zinc-800 shadow-sm text-white'
                                    : 'ml-0.5 relative w-1/2 border border-transparent text-zinc-400'
                            } rounded-md m-1 py-2 text-sm font-medium whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-opacity-50 focus:z-10 sm:w-auto sm:px-8`}
                        >
                            {`${interval.charAt(0).toUpperCase()}${interval.slice(1)} billing`}
                        </button>
                    ))}
                </div>
            </div>
            <div className="flex space-x-4 justify-center w-full">
                {plans.length > 0 && plans.map((plan, index) => (
                    <div key={index} className="bg-gray-950 bg-opacity-60 rounded-lg w-1/4 p-6 ml-4 mt-8"
                         style={{height: '300px'}}>
                        <h2 className={"uppercase"}>{plan.plan_name}</h2>
                        <p className="text-lg mt-10 mb-8" style={{fontSize: '3rem'}}>{billingInterval === "monthly" ? plan.monthly_price : plan.annual_price}</p>

                        <ul className="text-white">
                            <li>{plan.features}</li>
                        </ul>
                        <button onClick={() => {
                            subscribePlan(plan.plan_id)
                        }} className="bg-white text-black py-2 px-4 mt-4 rounded-lg">Subscribe</button>
                    </div>
                ))}
            </div>
        </>
    );
}



