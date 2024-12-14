import React, { useState, useEffect } from "react";
import "../technicalPassportService.css"
import { fetchWithToken } from '../apiClient';
import config from '../config';


const Elevators = ({ addressId }) => {

    const [formData, setFormData] = useState([]);
    const [missingFields, setMissingFields] = useState([]);
    const [statusMessage, setStatusMessage] = useState("");
    const [isModalVisible, setIsModalVisible] = useState(false);

    const fieldLabels = {

        lift_type: "Тип лифта",
        factory_number: "Заводской номер",
        inventory_number: "Инвентарный номер",
        load_capacity: "Грузоподъемность, кг",
        commissioning_year: "Год ввода в эксплуатацию",
        normative_lifetime: "Нормативный срок службы",
        physical_wear: "Физический износ, %",
        last_major_repair_year: "Год проведения последнего капитального ремонта",

    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => {
            const updatedData = [...prevData];
            const fieldIndex = updatedData.findIndex((field) => field.name === name);

            if (fieldIndex !== -1) {
                updatedData[fieldIndex].value = value;
            } else {
                updatedData.push({ name, value });
            }

            return updatedData;
        });
    };

    useEffect(() => {
        if (missingFields.length === 0 && isModalVisible || missingFields.length !== 0 && isModalVisible) {
            const timer = setTimeout(() => {
                setIsModalVisible(false);
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, [missingFields, isModalVisible]);

    const handleSave = () => {

        const requiredFields = {
            "Лифты": ["lift_type", "factory_number", "inventory_number", "load_capacity", "commissioning_year", "normative_lifetime", "physical_wear", "last_major_repair_year"],
        };
        const fields = requiredFields["Лифты"] || [];
        const missing = fields.filter((name) => {
            const field = formData.find((item) => item.name === name);
            return field === undefined || field.value === undefined || field.value === "";
        });

        if (missing.length > 0) {
            setMissingFields(missing);
            const missingLabels = missing.map((name) => fieldLabels[name]);
            setStatusMessage(`Не внесены данные в строки: ${missingLabels.join(", ")}`);
            if (!isModalVisible) setIsModalVisible(true);
            return;
        } else {
            setMissingFields([]);
            setStatusMessage("Данные внесены");
            if (!isModalVisible) setIsModalVisible(true);
        }
        sendData(formData);
        setStatusMessage("Данные успешно сохранены");
        setTimeout(() => setStatusMessage(""), 3000);
        setFormData([]);
    };

    const sendData = async (formData) => {
        const url = `${config.apiUrl}/buildings/lifts/`;

        const transformedData = formData.reduce((acc, item) => {
            acc[item.name] = item.value;
            return acc;
        }, {});

        transformedData.house = addressId;

        try {
            const result = await fetchWithToken(url, {
                method: 'POST',
                body: JSON.stringify(transformedData),
            });

            console.log('Успех:', result);
            return result;
        } catch (error) {
            console.error('Ошибка при отправке данных:', error);
            throw error;
        }
    };

    return (
        <>
            {isModalVisible && (
                <div className="modal">
                    {missingFields.length > 0 ? (
                        <>
                            <p>Данные не внесены:</p>
                            <ul>
                                {missingFields.map((fieldName) => (
                                    <li key={fieldName}>{fieldLabels[fieldName]}</li>
                                ))}
                            </ul>
                        </>
                    ) : (
                        <p>Данные внесены</p>
                    )}
                </div>
            )}
            <div className="form-section">
                <h2>Лифты</h2>
                <div className="form-grid">
                    <div
                        className="form-group"
                    >
                        <label className="form-label">
                            Номер подъезда, в котором расположен лифт(при наличии):
                        </label>
                        <input
                            value={
                                formData.find((item) => item.name === "entrance_number")?.value || ""
                            }
                            type="number"
                            name="entrance_number"
                            className="form-input"
                            onChange={handleInputChange}
                        />
                    </div>
                    <div
                        className={`form-group ${missingFields.includes("lift_type") ? "error" : ""}`}
                    >
                        <label className="form-label">
                            Тип лифта:
                        </label>
                        <select
                            value={
                                formData.find((item) => item.name === "lift_type")?.value || ""
                            }
                            name="lift_type"
                            className="form-input"
                            onChange={handleInputChange}
                        >
                            <option value="" disabled>
                                Выберите тип лифта...
                            </option>
                            <option value="пассажирский">Пассажирский</option>
                            <option value="грузовой">Грузовой</option>
                        </select>
                    </div>
                    <div
                        className={`form-group ${missingFields.includes("factory_number") ? "error" : ""}`}
                    >
                        <label className="form-label">
                            Заводской номер:
                        </label>
                        <input
                            value={
                                formData.find((item) => item.name === "factory_number")?.value || ""
                            }
                            type="number"
                            name="factory_number"
                            className="form-input"
                            onChange={handleInputChange}
                        />
                    </div>
                    <div
                        className={`form-group ${missingFields.includes("inventory_number") ? "error" : ""}`}
                    >
                        <label className="form-label">
                            Инвентарный номер:
                        </label>
                        <input
                            value={
                                formData.find((item) => item.name === "inventory_number")?.value || ""
                            }
                            type="number"
                            name="inventory_number"
                            className="form-input"
                            onChange={handleInputChange}
                        />
                    </div>
                    <div
                        className={`form-group ${missingFields.includes("load_capacity") ? "error" : ""}`}
                    >
                        <label className="form-label">
                            Грузоподъемность, кг:
                        </label>
                        <input
                            value={
                                formData.find((item) => item.name === "load_capacity")?.value || ""
                            }
                            type="number"
                            name="load_capacity"
                            className="form-input"
                            onChange={handleInputChange}
                        />
                    </div>
                    <div
                        className={`form-group ${missingFields.includes("commissioning_year") ? "error" : ""}`}
                    >
                        <label className="form-label">
                            Год ввода в эксплуатацию:
                        </label>
                        <input
                            value={
                                formData.find((item) => item.name === "commissioning_year")?.value || ""
                            }
                            type="number"
                            name="commissioning_year"
                            className="form-input"
                            onChange={handleInputChange}
                        />
                    </div>
                    <div
                        className={`form-group ${missingFields.includes("normative_lifetime") ? "error" : ""}`}
                    >
                        <label className="form-label">
                            Нормативный срок службы:
                        </label>
                        <input
                            value={
                                formData.find((item) => item.name === "normative_lifetime")?.value || ""
                            }
                            type="number"
                            name="normative_lifetime"
                            className="form-input"
                            onChange={handleInputChange}
                        />
                    </div>
                    <div
                        className={`form-group ${missingFields.includes("physical_wear") ? "error" : ""}`}
                    >
                        <label className="form-label">
                            Физический износ, % :
                        </label>
                        <input
                            value={
                                formData.find((item) => item.name === "physical_wear")?.value || ""
                            }
                            type="number"
                            name="physical_wear"
                            className="form-input"
                            onChange={handleInputChange}
                        />
                    </div>
                    <div
                        className={`form-group ${missingFields.includes("last_major_repair_year") ? "error" : ""}`}
                    >
                        <label className="form-label">
                            Год проведения последнего капитального ремонта:
                        </label>
                        <input
                            value={
                                formData.find((item) => item.name === "last_major_repair_year")?.value || ""
                            }
                            type="number"
                            name="last_major_repair_year"
                            className="form-input"
                            onChange={handleInputChange}
                        />
                    </div>
                </div>
                <div className="button-container-save-elivators">
                    <button onClick={handleSave}>Добавить лифт</button>
                </div>
            </div>
        </>
    );
}

export default Elevators;