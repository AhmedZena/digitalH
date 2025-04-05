import * as XLSX from "xlsx";

export const exportToExcel = (
	data: Record<string, unknown>[],
	headers: string[],
	translatedHeaders: string[],
	filename = "ExportedData.xlsx",
) => {
	// Convert the data into a worksheet
	const worksheet = XLSX.utils.json_to_sheet(data);

	// Add translated headers as the first row
	const headerRow: Record<string, string> = {};
	headers.forEach((header, index) => {
		const cellAddress = `${XLSX.utils.encode_col(index)}1`;
		worksheet[cellAddress] = { v: translatedHeaders[index], t: "s" };
		headerRow[header] = translatedHeaders[index];
	});

	// Adjust column widths for better readability
	worksheet["!cols"] = headers.map(() => ({ wch: 20 }));

	// Create a new workbook and append the worksheet
	const workbook = XLSX.utils.book_new();
	XLSX.utils.book_append_sheet(workbook, worksheet, "Data");

	// Write the Excel file
	XLSX.writeFile(workbook, filename);
};
