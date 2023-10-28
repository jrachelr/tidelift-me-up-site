import clsx from "clsx";

import { Caret } from "./Caret";
import styles from "./TableHead.module.css";

type TableOrder = "ascending" | "descending" | undefined;

type TableSort = "estimate" | "lifted" | "name" | undefined;

export interface TableHeadProps {
	order: TableOrder;
	setSortAndOrder: (received: TableSort) => void;
	sort: TableSort;
}

export function TableHead({ order, setSortAndOrder, sort }: TableHeadProps) {
	return (
		<thead>
			<tr>
				<th className={styles.th}>
					<button
						className={clsx(
							styles.sortWidget,
							sort === "name" && styles.isActive,
						)}
						onClick={() => setSortAndOrder("name")}
					>
						Package Name
						<Caret order={order} sort="name" />
						{/* <span
							className={clsx(
								styles.caret,
								order === "descending" &&
									sort === "name" &&
									styles.isDescending,
							)}
						>
							▾
						</span> */}
					</button>
				</th>
				<th className={styles.th}>
					<button
						className={clsx(
							styles.sortWidget,
							sort === "estimate" && styles.isActive,
						)}
						onClick={() => setSortAndOrder("estimate")}
					>
						Estimate
						<Caret order={order} sort="estimate" />
						{/* <span
							className={clsx(
								styles.caret,
								order === "descending" &&
									sort === "estimate" &&
									styles.isDescending,
							)}
						>
							▾
						</span> */}
					</button>
				</th>
				<th className={styles.th}>
					Status
					<button
						className={clsx(
							styles.sortWidget,
							sort === "lifted" && styles.isActive,
							order === "descending" &&
								sort === "lifted" &&
								styles.isDescending,
						)}
						onClick={() => setSortAndOrder("lifted")}
					>
						▾
					</button>
				</th>
			</tr>
		</thead>
	);
}
