"use client";
import { useState } from "react";
import { EstimatedPackage } from "tidelift-me-up";

import { Estimate } from "./Estimate";
import styles from "./ResultDisplay.module.css";
import { ResultsContainer } from "./ResultsContainer";

export interface ResultDisplayProps {
	result: Error | EstimatedPackage[] | undefined;
}

export function ResultDisplay({ result }: ResultDisplayProps) {
	const [sort, setSort] = useState("lifted"); //state for columns(map key)
	// const [order, setOrder] = useState("ascending");

	if (!result) {
		return null;
	}

	if (result instanceof Error) {
		return (
			<ResultsContainer heading="Oh no! Error!">
				<pre className={styles.error}>
					<code>{result.stack}</code>
				</pre>
			</ResultsContainer>
		);
	}

	if (!result.length) {
		return (
			<ResultsContainer heading="No results...">
				<p className={styles.p}>Ah well!</p>
			</ResultsContainer>
		);
	}

	return (
		<ResultsContainer
			heading={`${counted(result.length, "Liftable Package")} Found`}
		>
			<p className={styles.p}>
				With a funding estimate of <b>~${sumEstimateFunding(result)}</b>
			</p>
			<table className={styles.estimates}>
				<thead>
					<tr>
						<th className={styles.th}>
							Package Name
							<button onClick={() => setSort("name")}>click me!</button>
						</th>
						<th className={styles.th}>
							Estimate
							<button onClick={() => setSort("estimate")}>click me!</button>
						</th>
						<th className={styles.th}>
							Status
							<button onClick={() => setSort("lifted")}>click me!</button>
						</th>
					</tr>
				</thead>
				<tbody>
					{result
						.sort((a, b) => {
							if (sort === "name") {
								return a.name.localeCompare(b.name);
							}

							if (sort === "estimate") {
								return a.estimatedMoney > b.estimatedMoney ? 1 : -1;
							}

							if (sort === "lifted") {
								return a.lifted === b.lifted
									? a.estimatedMoney === b.estimatedMoney
										? a.name.localeCompare(b.name)
										: b.estimatedMoney - a.estimatedMoney
									: a.lifted
									? 1
									: -1;
							}

							return a.lifted === b.lifted
								? a.estimatedMoney === b.estimatedMoney
									? a.name.localeCompare(b.name)
									: b.estimatedMoney - a.estimatedMoney
								: a.lifted
								? 1
								: -1;
						})
						.map((packageEstimate) => (
							<Estimate
								estimatedPackage={packageEstimate}
								key={packageEstimate.name}
							/>
						))}
				</tbody>
			</table>
		</ResultsContainer>
	);
}

function counted(count: number, text: string) {
	return `${count} ${text}${count === 1 ? "" : "s"}`;
}

function sumEstimateFunding(packages: EstimatedPackage[]) {
	const total = packages
		.reduce((total, current) => total + current.estimatedMoney, 0)
		.toLocaleString("en-US", {
			maximumFractionDigits: 0,
		});
	return total;
}

// todo: figure out ascending & descending
