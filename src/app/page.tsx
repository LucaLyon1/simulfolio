"use client";

import MtcChart from "@/components/MtcChart";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const simulationSchema = z.object({
  initial: z.number({ required_error: "Please enter a number" }),
  rfr: z.number({ required_error: "Please enter a number" }),
  volatility: z.number({ required_error: "Please enter a number" }),
  duration: z.number({ required_error: "Please enter a number" }),
})

export default function Home() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({ resolver: zodResolver(simulationSchema) });

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-[#09090B]">
      <form
        className="flex-2 p-4 rounded-md border border-gray-800 flex flex-col gap-4 w-4/5 sm:w-2/3 md:w-1/2 lg:w-1/3"
        onSubmit={handleSubmit((d) => console.log(d))}>
        <h1 className="text-3xl font-bold">
          Use Monte Carlo to Simulate your future portfolio value !
        </h1>
        <label
          className="text-xl font-medium"
          htmlFor="value">Initial portfolio value</label>
        <input
          className="p-2 rounded-md bg-inherit border border-gray-800"
          {...register("initial", { valueAsNumber: true })}
          placeholder="100 000$" />
        {errors.initial?.message && <span className="text-red-600">{errors.initial?.message as string}</span>}
        <label
          className="text-xl font-medium"
          htmlFor="rfr">Risk free rate</label>
        <input
          className="p-2 rounded-md bg-inherit border border-gray-800"
          {...register("rfr", { valueAsNumber: true })}
          placeholder="3.0%" />
        {errors.rfr?.message && <span className="text-red-600">{errors.rfr?.message as string}</span>}
        <label
          className="text-xl font-medium"
          htmlFor="volatility">Volatility</label>
        <input
          className="p-2 rounded-md bg-inherit border border-gray-800"
          {...register("volatility", { valueAsNumber: true })}
          placeholder="25.0%" />
        {errors.volatility?.message && <span className="text-red-600">{errors.volatility?.message as string}</span>}
        <label
          className="text-xl font-medium"
          htmlFor="duration">Duration (in  days)</label>
        <input
          className="p-2 rounded-md bg-inherit border border-gray-800"
          {...register("duration", { valueAsNumber: true })}
          placeholder="252 (1 year)" />
        {errors.duration?.message && <span className="text-red-600">{errors.duration?.message as string}</span>}
        <button
          className="px-4 py-2 border border-gray-800 rounded-md mx-auto hover:bg-gray-800 hover:scale-105 transition-all"
          type="submit">
          Calculate growth !
        </button>
      </form>
      <div className="flex-1 w-full h-full">
        <MtcChart />
      </div>
    </div>
  );
}
