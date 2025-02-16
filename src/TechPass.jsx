
import React, { useState, useEffect } from "react";
import "./technicalPassportService.css"
import { fetchWithToken } from './apiClient';
import * as XLSX from "xlsx";
import config from './config';
import Elevators from "./components/elivators";
import TableTechPass from "./components/tableTechPass";

const TechnicalPassportService = () => {

    const sections = [
        "Общие сведения",
        "Конструктив",
        "Инженерные сети",
        "Приборы учета",
    ];

    const [user, setUser] = useState("");
    const [activeTab, setActiveTab] = useState("technicalPassport");
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [selectedSection, setSelectedSection] = useState(sections[0]);
    const [inputValue, setInputValue] = useState("");
    const [selectedAddress, setSelectedAddressLocal] = useState("");
    const [formData, setFormData] = useState([]);
    const [missingFields, setMissingFields] = useState([]);
    const [statusMessage, setStatusMessage] = useState("");
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [buildingsList, setBuildings] = useState([]);
    const [selectedBuilding, setSelectedBuilding] = useState("");
    const [fullInfoTechPass, setFullInfoTechPass] = useState();

    const fetchBuildings = async (addressId) => {
        try {
            const url = `${config.apiUrl}/buildings/building/${addressId}`;
            const data = await fetchWithToken(url);
            setFullInfoTechPass(data);
        } catch (error) {
            console.error("Ошибка при получении списка зданий:", error);
        }
    };

    useEffect(() => {
        const savedUser = localStorage.getItem("user");
        if (savedUser) {
            setIsLoggedIn(true);
        }

        const getMe = async () => {
            const url = `${config.apiUrl}/user/profile/`;
            const data = await fetchWithToken(url);
            return data;
        };

        const fetchBuildings = async () => {
            try {
                const url = `${config.apiUrl}/buildings/buildings-list/`;
                const data = await fetchWithToken(url);
                setBuildings(data);
            } catch (error) {
                console.error("Ошибка при получении списка зданий:", error);
            }
        };

        fetchBuildings();
        getMe();

    }, []);

    useEffect(() => {
        setFormData((prevData) => {
            const updatedData = [...prevData];

            const buildingPurposeIndex = updatedData.findIndex((item) => item.name === "purpose_of_building");
            if (buildingPurposeIndex !== -1) {
                updatedData[buildingPurposeIndex].value = inputValue;
            } else {
                updatedData.push({ name: "purpose_of_building", value: inputValue });
            }

            const addressIndex = updatedData.findIndex((item) => item.name === "address");
            if (addressIndex !== -1) {
                updatedData[addressIndex].value = selectedAddress;
            } else {
                updatedData.push({ name: "address", value: selectedAddress });
            }

            const haveDistanseUseForColdWater = updatedData.findIndex((item) => item.name === "remote_reading_cold_water");
            if (haveDistanseUseForColdWater === -1) {
                updatedData.push({ name: "remote_reading_cold_water", value: false });
            }

            const haveDistanseUseForHotWater = updatedData.findIndex((item) => item.name === "remote_reading_hot_water");
            if (haveDistanseUseForHotWater === -1) {
                updatedData.push({ name: "remote_reading_hot_water", value: false });
            }

            const haveDistanseUseWearEnergy = updatedData.findIndex((item) => item.name === "remote_reading_thermal_energy");
            if (haveDistanseUseWearEnergy === -1) {
                updatedData.push({ name: "remote_reading_thermal_energy", value: false });
            }

            const haveDistanseUseGaz = updatedData.findIndex((item) => item.name === "remote_reading_gas");
            if (haveDistanseUseGaz === -1) {
                updatedData.push({ name: "remote_reading_gas", value: false });
            }

            const haveDistanseUseElecticEnergy = updatedData.findIndex((item) => item.name === "remote_reading_electricity");
            if (haveDistanseUseElecticEnergy === -1) {
                updatedData.push({ name: "remote_reading_electricity", value: false });
            }

            const manageOrgIndex = updatedData.findIndex((item) => item.name === "manage_org");
            if (manageOrgIndex === -1) {
                updatedData.push({ name: "manage_org", value: "BootcampBrigade" });
            }

            return updatedData;
        });
    }, [inputValue, selectedAddress]);

    const buildings = [
        { name: "Корпус №1", address: "ул. Комсомольская, д. 95" },
        { name: "Корпус №2", address: "ул. Комсомольская, д. 39а" },
        { name: "Корпус №3", address: "ул. Комсомольская, д. 41" },
        { name: "Корпус №4", address: "ул. Комсомольская, д. 95" },
        { name: "Корпус №5", address: "ул. Октябрьская, д. 25" },
        { name: "Корпус №6", address: "ул. Ленина, д. 6а" },
        { name: "Корпус №7", address: "пер. Воскресенский, д. 3" },
        { name: "Корпус №8", address: "ул. Комсомольская, д. 39б" },
        { name: "Корпус №9", address: "ул. Московская, д. 159а" },
        { name: "Корпус №10", address: "ул. Комсомольская, д. 41" },
        { name: "Корпус №11", address: "Наугорское шоссе, д. 29" },
        { name: "Корпус №12", address: "Наугорское шоссе, д. 40" },
        { name: "Корпус №13", address: "ул. Московская, д. 65" },
        { name: "Корпус №14", address: "пер. Артельный, д. 5" },
        { name: "Корпус №15", address: "ул. Московская, д.34" },
        { name: "Корпус №16", address: "ул. Московская, д. 77" },
        { name: "Корпус №17", address: "пл. Каменская, д.1" },
        { name: "Мценский филиал", address: "г. Мценск, ул. Тургенева, д. 196" },
        { name: "Ливенский филиал", address: "г. Ливны, ул.Мира, д. 152-а" },
        { name: "Карачевский филиал", address: "г. Карачев, ул. Горького, д. 1Б" },
        { name: "Общежитие №1", address: "ул. Комсомольская, д. 115" },
        { name: "Общежитие №2", address: "ул. Комсомольская, д. 117" },
        { name: "Общежитие №3", address: "ул. МОПРа, д.16" },
        { name: "Общежитие №4", address: "ул. МОПРа, д. 14а" },
        { name: "Общежитие №5", address: "ул. Максима Горького, д. 115" },
        { name: "Общежитие №6", address: "Наугорское шоссе, д. 29а" },
        { name: "Общежитие №7", address: "ул. Старо-Московская, д.14" },
        { name: "Общежитие №8", address: "пл. Поликарпова, д.32" },
        { name: "Общежитие №9", address: "Наугорское шоссе, д. 29а, корп.1" },
        { name: "Студенческая поликлиника", address: "ул. Красина, д.3" },
        { name: "Спорткомплекс", address: "ул. Скворцова, д. 5" },
        { name: "Бассейн", address: "ул. Скворцова, д. 5" },
        { name: "База отдыха Зелёный берег", address: "" },
    ];

    const fieldLabels = {
        address: "Адрес здания",
        cadastre_number: "Кадастровый номер",
        purpose_of_building: "Назначение здания",
        year_operation: "Год ввода в эксплуатацию",
        year_construction: "Год постройки",
        year_reconstruction: "Год проведения реконструкции",
        floorCount: "Количество этажей",
        underground_floor_count: "Количество подземных этажей",
        number_entrances: "Количество подъездов в здании",
        number_elevators: "Количество лифтов",
        number_working_rooms: "Количество рабочих помещений (кабинетов, аудиторий)",
        number_auxiliary_rooms: "Количество вспомогательных помещений, в т.ч. общего пользования",
        total_area_working_premises: "Общая площадь рабочих помещений, 10В.м",
        total_area_auxiliary_premises_except_common_areas: "Общая площадь вспомогательных помещений, за исключением помещений общего пользования, КВ.м",
        total_area_common_areas_building: "Общая площадь помещений общего пользования в здании, КВ.м",
        balcony_count: "Количество балконов",
        lodji_count: "Количество лоджий",
        life_cycle_stage: "Стадия жизненного цикла",
        foundation_type: "Тип фундамента",
        foundation_material: "Материал фундамента",
        paving_area: "Площадь отмостки (КВ.м)",
        foundation_wear: "Физический износ, %",
        foundation_last_repair_year: "Год проведения последнего капитального ремонта",
        internal_walls_type: "Тип внутренних стен",
        internal_walls_material: "Материал внутренних стен",
        internal_walls_wear: "Физический износ, %",
        external_walls_type: "Тип наружных стен",
        external_walls_material: "Материал наружных стен",
        facade_insulation_type: "Тип наружного утепления фасада",
        facade_cladding_material: "Материал отделки фасада",
        external_walls_wear: "Физический износ наружных стен, %",
        facade_last_repair_year: "Год проведения последнего капитального ремонта",
        floor_type: "Тип перекрытий",
        floor_structure: "Конструкция перекрытий",
        floor_wear: "Физический износ, %",
        roof_shape: "Форма крыши",
        roof_structure_type: "Вид несущей части",
        roof_structure_wear: "Физический износ, %",
        roof_last_repair_year: "Год проведения последнего капитального ремонта",
        attic_insulation: "Утепляющие слои чердачных перекрытий",
        roof_cover_type: "Тип кровли",
        roof_cover_wear: "Физический износ, %",
        roof_cover_last_repair_year: "Год проведения последнего капитального ремонта",
        windows_wear: "Физический износ окон, %",
        windows_material: "Материал окон",
        doors_wear: "Физический износ дверей, %",
        common_area_wear: "Физический износ отделочных покрытий помещений общего пользования, %",
        element_name: "Наименование конструктивного элемента",
        element_wear: "Физический износ, %",
        element_last_repair_year: "Год проведения последнего капитального ремонта",
        heating_wear: "Физический износ, %",
        heating_last_repair_year: "Год проведения последнего капитального ремонта",
        heating_system_type: "Тип внутридомовой системы отопления",
        heat_source_type: "Тип теплоисточника или теплоносителя внутридомовой системы отопления",
        heating_inlets_count: "Количество вводов системы отопления в здание (количество точек поставки)",
        network_wear: "Физический износ, %",
        network_material: "Материал сети",
        network_insulation_material: "Материал теплоизоляции сети",
        risers_wear: "Физический износ, %",
        valves_wear: "Физический износ, %",
        radiators_wear: "Физический износ, %",
        radiators_type: "Тип отопительных приборов",
        stoves_wear: "Физический износ, %",
        stoves_last_repair_year: "Год проведения последнего капитального ремонта",
        cold_water_wear: "Физический износ, %",
        cold_water_last_repair_year: "Год проведения последнего капитального ремонта",
        cold_water_inlets_count: "Количество вводов внутридомовой инженерной системы холодного водоснабжения в здание (количество точек поставки)",
        cold_water_system_type: "Тип внутридомовой инженерной системы холодного водоснабжения",
        cold_water_network_wear: "Физический износ, %",
        cold_water_network_material: "Материал сети",
        only_cold_water_risers_wear: "Физический износ, %",
        only_cold_water_risers_material: "Материал",
        only_cold_water_valves_wear: "Физический износ, %",
        hot_water_wear: "Физический износ, %",
        hot_water_last_repair_year: "Год проведения последнего капитального ремонта",
        hot_water_inlets_count: "Количество вводов внутридомовой инженерной системы горячего водоснабжения в здание (количество точек поставки)",
        hot_water_system_type: "Тип внутридомовой инженерной системы горячего водоснабжения",
        hot_water_network_wear: "Физический износ, %",
        only_hot_water_network_material: "Материал сети",
        only_hot_water_network_network_insulation_material: "Материал теплоизоляции сети",
        only_hot_water_risers_wear: "Физический износ, %",
        only_hot_water_risers_material: "Материал",
        only_hot_water_valves_wear: "Физический износ, %",
        wastewater_wear: "Физический износ, %",
        wastewater_last_repair_year: "Год проведения последнего капитального ремонта",
        wastewater_system_type: "Тип внутридомовой инженерной системы водоотведения",
        wastewater_system_material: "Материал сети",
        gas_last_repair_year: "Год проведения последнего капитального ремонта",
        gas_system_type: "Тип внутридомовой инженерной системы газоснабжения",
        gas_inlets_count: "Количество вводов внутридомовой инженерной системы газоснабжения в здание (количество точек поставки)",
        electricity_wear: "Физический износ, %",
        electricity_last_repair_year: "Год проведения последнего капитального ремонта",
        electricity_inlets_count: "Количество вводов внутридомовой инженерной системы электроснабжения в здание(количество точек поставки)",
        balconies_wear: "Физический износ, %",
        resource_name: "Наименование коммунального ресурса",
        meter_brand: "Марка прибора учета",
        serial_number: "Заводской номер (серийный)",
        unit: "Единица измерения",
        commissioning_date: "Дата ввода в эксплуатацию",
        meter_state: "Состояние",
        verification_interval: "Межповерочный интервал",
        planned_verification_date: "Плановая дата поверки",
        tariff_zone_type: "Вид прибора учета в зависимости от тарифных зон суток",
        remote_reading_cold_water: "Холодной воды",
        remote_reading_hot_water: "Горячей воды ",
        remote_reading_thermal_energy: "Тепловой энергии",
        remote_reading_gas: "Газа",
        remote_reading_electricity: "Электрической энергии",
        lift_type: "Тип лифта",
        factory_number: "Заводской номер",
        inventory_number: "Инвентарный номер",
        load_capacity: "Грузоподъемность, кг",
        commissioning_year: "Год ввода в эксплуатацию",
        normative_lifetime: "Нормативный срок службы",
        physical_wear: "Физический износ, %",
        last_major_repair_year: "Год проведения последнего капитального ремонта",
    };

    const handleSaveUser = () => {
        if (user.trim()) {
            localStorage.setItem("user", user);
            setIsLoggedIn(true);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("user");
        setIsLoggedIn(false);
    };

    useEffect(() => {
        if (missingFields.length === 0 && isModalVisible || missingFields.length !== 0 && isModalVisible) {
            const timer = setTimeout(() => {
                setIsModalVisible(false);
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, [missingFields, isModalVisible]);

    const handleNextSection = () => {

        const requiredFields = {
            "Общие сведения": ["cadastre_number", "year_construction", "life_cycle_stage", "year_operation", "year_reconstruction",
                "floorCount", "underground_floor_count", "number_entrances",
                "number_elevators", "number_working_rooms", "number_auxiliary_rooms", "total_area_working_premises", "total_area_auxiliary_premises_except_common_areas", "total_area_common_areas_building",
                "balcony_count", "lodji_count"],
            "Конструктив": ["foundation_type", "foundation_material", "paving_area", "foundation_wear", "foundation_last_repair_year", "internal_walls_type", "internal_walls_material",
                "internal_walls_wear", "external_walls_type", "external_walls_material", "facade_insulation_type", "facade_cladding_material", "external_walls_wear", "facade_last_repair_year", "floor_type", "floor_structure",
                "floor_wear", "roof_shape", "roof_structure_type", "roof_structure_wear", "roof_last_repair_year", "attic_insulation", "roof_cover_type",
                "roof_cover_wear", "roof_cover_last_repair_year", "windows_wear", "windows_material",
                "doors_wear", "common_area_wear", "element_name", "element_wear", "element_last_repair_year"],
            "Инженерные сети": ["heating_wear", "heating_last_repair_year", "heating_system_type", "heat_source_type", "heating_inlets_count", "network_wear", "network_material",
                "network_insulation_material", "risers_wear", "valves_wear", "radiators_wear", "radiators_type", "stoves_wear", "stoves_last_repair_year", "cold_water_wear",
                "cold_water_last_repair_year", "cold_water_inlets_count", "cold_water_system_type", "cold_water_network_wear", "cold_water_network_material", "only_cold_water_risers_wear", "only_cold_water_risers_material",
                "only_cold_water_valves_wear", "hot_water_wear", "hot_water_last_repair_year", "hot_water_system_type", "hot_water_inlets_count", "hot_water_network_wear", "only_hot_water_network_material",
                "only_hot_water_network_network_insulation_material", "only_hot_water_risers_wear", "only_hot_water_risers_material", "only_hot_water_valves_wear", "wastewater_wear", "wastewater_last_repair_year",
                "wastewater_system_type", "wastewater_system_material", "gas_last_repair_year", "gas_system_type", "gas_inlets_count", "electricity_wear", "electricity_last_repair_year", "electricity_inlets_count",
                "balconies_wear"
            ],
            "Лифты": ["lift_type", "factory_number", "inventory_number", "load_capacity", "commissioning_year", "normative_lifetime", "physical_wear", "last_major_repair_year"],

        };
        const fields = requiredFields[selectedSection] || [];
        const missing = fields.filter((name) => {
            const field = formData.find((item) => item.name === name);
            return field === undefined || field.value === undefined || field.value === "";
        });

        if (missing.length > 0) {
            setMissingFields(missing);
            const missingLabels = missing.map((name) => fieldLabels[name]);
            console.log("zxc");
            setStatusMessage(`Не внесены данные в строки: ${missingLabels.join(", ")}`);
            if (!isModalVisible) setIsModalVisible(true);
            return;
        } else {
            setMissingFields([]);
            console.log("zxc1");
            setStatusMessage("Данные внесены");
            if (!isModalVisible) setIsModalVisible(true);
        }

        const currentIndex = sections.indexOf(selectedSection);
        if (currentIndex < sections.length - 1) {
            setSelectedSection(sections[currentIndex + 1]);
        }
    };

    const handlePreviousSection = () => {
        const currentIndex = sections.indexOf(selectedSection);
        if (currentIndex > 0) {
            setSelectedSection(sections[currentIndex - 1]);
        }
    };

    const handleAddressSelect = (address) => {
        const building = buildings.find((b) => b.name === address);
        if (building) {
            setSelectedAddressLocal(building.address);
            setInputValue(building.name);
        }
    };

    const handleSectionChange = (e) => {
        setSelectedSection(e.target.value);
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

    const handleSave = () => {
        
        const requiredFields = {
            "Приборы учета": ["resource_name", "meter_brand", "serial_number", "unit", "commissioning_date", "meter_state", "verification_interval", "planned_verification_date", "tariff_zone_type",
                "remote_reading_cold_water", "remote_reading_hot_water", "remote_reading_thermal_energy", "remote_reading_gas", "remote_reading_electricity"],
        };
        const fields = requiredFields[selectedSection] || [];
        const missing = fields.filter((name) => {
            const field = formData.find((item) => item.name === name);
            return field === undefined || field.value === undefined || field.value === "";
        });

        if (missing.length > 0) {
            setMissingFields(missing);
            const missingLabels = missing.map((name) => fieldLabels[name]);
            console.log("zxc");
            setStatusMessage(`Не внесены данные в строки: ${missingLabels.join(", ")}`);
            if (!isModalVisible) setIsModalVisible(true);
            return;
        } else {
            setMissingFields([]);
            console.log("zxc1");
            setStatusMessage("Данные внесены");
            if (!isModalVisible) setIsModalVisible(true);
        }

        sendData(formData);
        setStatusMessage("Данные успешно сохранены");
        setTimeout(() => setStatusMessage(""), 5000);
        setFormData([]);
    };

    const exportToExcel = () => {
        if (!fullInfoTechPass) {
            alert("Нет данных для экспорта.");
            return;
        }
    
        const sections = [
            "Общие сведения",
            "Конструктив",
            "Инженерные сети",
            "Лифты",
            "Приборы учета",
        ];
    
        const FieldsExecl = {
            "Общие сведения": ["address", "purpose_of_building", "cadastre_number", "year_construction", "life_cycle_stage", "year_operation", "year_reconstruction",
                "floorCount", "underground_floor_count", "number_entrances",
                "number_elevators", "number_working_rooms", "number_auxiliary_rooms", "total_area_working_premises", "total_area_auxiliary_premises_except_common_areas", "total_area_common_areas_building",
                "balcony_count", "lodji_count"],
            "Конструктив": ["foundation_type", "foundation_material", "paving_area", "foundation_wear", "foundation_last_repair_year", "internal_walls_type", "internal_walls_material",
                "internal_walls_wear", "external_walls_type", "external_walls_material", "facade_insulation_type", "facade_cladding_material", "external_walls_wear", "facade_last_repair_year", "floor_type", "floor_structure",
                "floor_wear", "roof_shape", "roof_structure_type", "roof_structure_wear", "roof_last_repair_year", "attic_insulation", "roof_cover_type",
                "roof_cover_wear", "roof_cover_last_repair_year", "windows_wear", "windows_material",
                "doors_wear", "common_area_wear", "element_name", "element_wear", "element_last_repair_year"],
            "Инженерные сети": ["heating_wear", "heating_last_repair_year", "heating_system_type", "heat_source_type", "heating_inlets_count", "network_wear", "network_material",
                "network_insulation_material", "risers_wear", "valves_wear", "radiators_wear", "radiators_type", "stoves_wear", "stoves_last_repair_year", "cold_water_wear",
                "cold_water_last_repair_year", "cold_water_inlets_count", "cold_water_system_type", "cold_water_network_wear", "cold_water_network_material", "only_cold_water_risers_wear", "only_cold_water_risers_material",
                "only_cold_water_valves_wear", "hot_water_wear", "hot_water_last_repair_year", "hot_water_system_type", "hot_water_inlets_count", "hot_water_network_wear", "only_hot_water_network_material",
                "only_hot_water_network_network_insulation_material", "only_hot_water_risers_wear", "only_hot_water_risers_material", "only_hot_water_valves_wear", "wastewater_wear", "wastewater_last_repair_year",
                "wastewater_system_type", "wastewater_system_material", "gas_last_repair_year", "gas_system_type", "gas_inlets_count", "electricity_wear", "electricity_last_repair_year", "electricity_inlets_count",
                "balconies_wear"],
            "Лифты": ["lift_type", "factory_number", "inventory_number", "load_capacity", "commissioning_year", "normative_lifetime", "physical_wear", "last_major_repair_year"],
            "Приборы учета": ["resource_name", "meter_brand", "serial_number", "unit", "commissioning_date", "meter_state", "verification_interval", "planned_verification_date", "tariff_zone_type",
                "remote_reading_cold_water", "remote_reading_hot_water", "remote_reading_thermal_energy", "remote_reading_gas", "remote_reading_electricity"],
        };
    
        const workbook = XLSX.utils.book_new();
    
        sections.forEach((section) => {
            const fields = FieldsExecl[section];
    
            if (section === "Лифты" && fullInfoTechPass.lifts) {
                const liftsData = fullInfoTechPass.lifts.map((lift, index) => {
                    const liftInfo = { "Лифт №": index + 1 };
                    fields.forEach((field) => {
                        if (fieldLabels[field]) {
                            liftInfo[fieldLabels[field]] = lift[field] || "";
                        }
                    });
                    return liftInfo;
                });
    
                const liftsSheet = XLSX.utils.json_to_sheet(liftsData);
                liftsSheet["!cols"] = Object.keys(liftsData[0] || {}).map(() => ({ wch: 20 }));
    
                XLSX.utils.book_append_sheet(workbook, liftsSheet, section);
            } else {
                const sectionData = fields
                    .filter((field) => field in fullInfoTechPass)
                    .map((field) => ({
                        "Название поля": fieldLabels[field] || field,
                        "Значение": fullInfoTechPass[field] || "",
                    }));
    
                if (sectionData.length > 0) {
                    const sectionSheet = XLSX.utils.json_to_sheet(sectionData);
    
                    sectionSheet["!cols"] = [
                        { wch: 30 }, 
                        { wch: 20 }, 
                    ];
    
                    XLSX.utils.book_append_sheet(workbook, sectionSheet, section);
                }
            }
        });
    
        XLSX.writeFile(workbook, "Технический_паспорт.xlsx");
    };
    
    

    const sendData = async (formData) => {
        const url = `${config.apiUrl}/buildings/building/`;

        const transformedData = formData.reduce((acc, item) => {
            acc[item.name] = item.value;
            return acc;
        }, {});

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
        <div className="technical-passport-container">
            {isLoggedIn === false ? (
                <div className="technical-passport-login">
                    <h1 className="technical-passport-login-title">Вход в сервис</h1>
                    <input
                        type="text"
                        placeholder="Введите ФИО"
                        className="technical-passport-login-input"
                        onBlur={(e) => setUser(e.target.value)}
                    />
                    <button
                        className="technical-passport-primary-button"
                        onClick={handleSaveUser}
                    >
                        Сохранить
                    </button>
                </div>
            ) : (
                <div className="technical-passport-main">
                    <div className="technical-passport-header">
                        <button
                            className="technical-passport-secondary-button technical-passport-exit-button"
                            onClick={handleLogout}
                        >
                            Выйти
                        </button>
                        <h1 className="technical-passport-title">Технический паспорт здания</h1>
                        <div className="main-button-container">
                            <button onClick={() => setActiveTab("technicalPassport")}>
                                Технический паспорт
                            </button>
                            <button onClick={() => setActiveTab("elevators")}>
                                Лифты
                            </button>
                            <button onClick={() => setActiveTab("viewPassport")}>
                                Просмотр технического паспорта
                            </button>
                        </div>
                    </div>


                    {activeTab === "technicalPassport" && (
                        <>
                            {isModalVisible && (
                                <div className="modalTechPass">
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

                            <div className="technical-passport-selectors">
                                <div className="technical-passport-address-selector">
                                    <input
                                        type="text"
                                        placeholder="Введите адрес"
                                        value={inputValue}
                                        className="technical-passport-input-main-field"
                                        onChange={(e) => {
                                            setInputValue(e.target.value);
                                            handleAddressSelect(e.target.value);
                                        }}
                                        list="address-options"
                                    />
                                    <datalist id="address-options">
                                        {buildings
                                            .filter((b) => b.name.toLowerCase().includes(inputValue.toLowerCase()))
                                            .map((b) => (
                                                <option key={b.name} value={b.name} />
                                            ))}
                                    </datalist>
                                </div>

                                <div className="technical-passport-section-selector">
                                    <select
                                        value={selectedSection}
                                        className="technical-passport-select-main-field"
                                        onChange={handleSectionChange}
                                        disabled
                                    >
                                        <option value="" disabled>
                                            Выберите раздел паспорта
                                        </option>
                                        {sections.map((section) => (
                                            <option key={section} value={section}>
                                                {section}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div className="form-container">
                                {selectedAddress ? (
                                    <>
                                        {selectedSection === "Общие сведения" && (
                                            <div className="form-grid">
                                                <div className="form-group">
                                                    <label className="form-label">
                                                        Адрес здания:
                                                    </label>
                                                    <input
                                                        type="text"
                                                        name="address"
                                                        className="form-input"
                                                        value={selectedAddress}
                                                        readOnly
                                                    />
                                                </div>
                                                <div
                                                    className={`form-group ${missingFields.includes("cadastre_number") ? "error" : ""}`}
                                                >
                                                    <label className="form-label">Кадастровый номер:</label>
                                                    <input
                                                        value={
                                                            formData.find((item) => item.name === "cadastre_number")?.value || ""
                                                        }
                                                        type="text"
                                                        name="cadastre_number"
                                                        className="form-input"
                                                        onChange={handleInputChange}
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <label className="form-label">
                                                        Назначение здания:
                                                    </label>
                                                    <input
                                                        type="text"
                                                        name="purpose_of_building"
                                                        className="form-input"
                                                        value={inputValue}
                                                        readOnly
                                                    />
                                                </div>
                                                <div
                                                    className={`form-group ${missingFields.includes("year_operation") ? "error" : ""}`}
                                                >
                                                    <label className="form-label">
                                                        Год ввода в эксплуатацию:
                                                    </label>
                                                    <input
                                                        value={
                                                            formData.find((item) => item.name === "year_operation")?.value || ""
                                                        }
                                                        type="number"
                                                        name="year_operation"
                                                        className="form-input"
                                                        onChange={handleInputChange}
                                                    />
                                                </div>
                                                <div
                                                    className={`form-group ${missingFields.includes("year_construction") ? "error" : ""}`}
                                                >
                                                    <label className="form-label">
                                                        Год постройки:
                                                    </label>
                                                    <input
                                                        value={
                                                            formData.find((item) => item.name === "year_construction")?.value || ""
                                                        }
                                                        type="number"
                                                        name="year_construction"
                                                        className="form-input"
                                                        onChange={handleInputChange}
                                                    />
                                                </div>
                                                <div
                                                    className={`form-group ${missingFields.includes("life_cycle_stage") ? "error" : ""}`}
                                                >
                                                    <label className="form-label">
                                                        Стадия жизненного цикла:
                                                    </label>
                                                    <select
                                                        value={
                                                            formData.find((item) => item.name === "life_cycle_stage")?.value || ""
                                                        }
                                                        name="life_cycle_stage"
                                                        className="form-input"
                                                        onChange={handleInputChange}
                                                    >
                                                        <option value="">
                                                            Выберите стадию жизненного цикла...
                                                        </option>
                                                        <option value="эксплуатация">Эксплуатация</option>
                                                        <option value="модернизация">Модернизация</option>
                                                        <option value="реконструкция">Реконструкция</option>
                                                        <option value="капитальный ремонт">Капитальный ремонт</option>
                                                    </select>
                                                </div>
                                                <div
                                                    className={`form-group ${missingFields.includes("year_reconstruction") ? "error" : ""}`}
                                                >
                                                    <label className="form-label">
                                                        Год проведения реконструкции:
                                                    </label>
                                                    <input
                                                        value={
                                                            formData.find((item) => item.name === "year_reconstruction")?.value || ""
                                                        }
                                                        type="number"
                                                        name="year_reconstruction"
                                                        className="form-input"
                                                        onChange={handleInputChange}
                                                    />
                                                </div>
                                                <div
                                                    className={`form-group ${missingFields.includes("floorCount") ? "error" : ""}`}
                                                >
                                                    <label className="form-label">
                                                        Количество этажей:
                                                    </label>
                                                    <input
                                                        value={
                                                            formData.find((item) => item.name === "floorCount")?.value || ""
                                                        }
                                                        type="number"
                                                        name="floorCount"
                                                        className="form-input"
                                                        onChange={handleInputChange}
                                                    />
                                                </div>
                                                <div
                                                    className={`form-group ${missingFields.includes("underground_floor_count") ? "error" : ""}`}
                                                >
                                                    <label className="form-label">
                                                        Количество подземных этажей:
                                                    </label>
                                                    <input
                                                        value={
                                                            formData.find((item) => item.name === "underground_floor_count")?.value || ""
                                                        }
                                                        type="number"
                                                        name="underground_floor_count"
                                                        className="form-input"
                                                        onChange={handleInputChange}
                                                    />
                                                </div>
                                                <div
                                                    className={`form-group ${missingFields.includes("number_entrances") ? "error" : ""}`}
                                                >
                                                    <label className="form-label">
                                                        Количество подъездов в здании:
                                                    </label>
                                                    <input
                                                        value={
                                                            formData.find((item) => item.name === "number_entrances")?.value || ""
                                                        }
                                                        type="number"
                                                        name="number_entrances"
                                                        className="form-input"
                                                        onChange={handleInputChange}
                                                    />
                                                </div>
                                                <div
                                                    className={`form-group ${missingFields.includes("number_elevators") ? "error" : ""}`}
                                                >
                                                    <label className="form-label">
                                                        Количество лифтов:
                                                    </label>
                                                    <input
                                                        value={
                                                            formData.find((item) => item.name === "number_elevators")?.value || ""
                                                        }
                                                        type="number"
                                                        name="number_elevators"
                                                        className="form-input"
                                                        onChange={handleInputChange}
                                                    />
                                                </div>
                                                <div
                                                    className={`form-group ${missingFields.includes("number_working_rooms") ? "error" : ""}`}
                                                >
                                                    <label className="form-label">
                                                        Количество рабочих помещений (кабинетов, аудиторий):
                                                    </label>
                                                    <input
                                                        value={
                                                            formData.find((item) => item.name === "number_working_rooms")?.value || ""
                                                        }
                                                        type="number"
                                                        name="number_working_rooms"
                                                        className="form-input"
                                                        onChange={handleInputChange}
                                                    />
                                                </div>
                                                <div
                                                    className={`form-group ${missingFields.includes("number_auxiliary_rooms") ? "error" : ""}`}
                                                >
                                                    <label className="form-label" title="Количество вспомогательных помещений, в т.ч. общего пользования">
                                                        Количество вспомогательных помещений, в т.ч. общего пользования
                                                    </label>
                                                    <input
                                                        value={
                                                            formData.find((item) => item.name === "number_auxiliary_rooms")?.value || ""
                                                        }
                                                        type="number"
                                                        name="number_auxiliary_rooms"
                                                        className="form-input"
                                                        onChange={handleInputChange}
                                                    />
                                                </div>
                                                <div
                                                    className={`form-group ${missingFields.includes("total_area_working_premises") ? "error" : ""}`}
                                                >
                                                    <label className="form-label">
                                                        Общая площадь рабочих помещений, кв.м:
                                                    </label>
                                                    <input
                                                        value={
                                                            formData.find((item) => item.name === "total_area_working_premises")?.value || ""
                                                        }
                                                        type="number"
                                                        name="total_area_working_premises"
                                                        className="form-input"
                                                        onChange={handleInputChange}
                                                    />
                                                </div>
                                                <div
                                                    className={`form-group ${missingFields.includes("total_area_auxiliary_premises_except_common_areas") ? "error" : ""}`}
                                                >
                                                    <label className="form-label" title="Общая площадь вспомогательных помещений, за исключением помещений общего пользования, КВ.м:">
                                                        Общая площадь вспомогательных помещений, за исключением помещений общего пользования, КВ.м:
                                                    </label>
                                                    <input
                                                        value={
                                                            formData.find((item) => item.name === "total_area_auxiliary_premises_except_common_areas")?.value || ""
                                                        }
                                                        type="number"
                                                        name="total_area_auxiliary_premises_except_common_areas"
                                                        className="form-input"
                                                        onChange={handleInputChange}
                                                    />
                                                </div>
                                                <div
                                                    className={`form-group ${missingFields.includes("total_area_common_areas_building") ? "error" : ""}`}
                                                >
                                                    <label className="form-label" title="Общая площадь помещений общего пользования в здании, КВ.м">
                                                        Общая площадь помещений общего пользования в здании, КВ.м:
                                                    </label>
                                                    <input
                                                        value={
                                                            formData.find((item) => item.name === "total_area_common_areas_building")?.value || ""
                                                        }
                                                        type="number"
                                                        name="total_area_common_areas_building"
                                                        className="form-input"
                                                        onChange={handleInputChange}
                                                    />
                                                </div>
                                                <div
                                                    className={`form-group ${missingFields.includes("balcony_count") ? "error" : ""}`}
                                                >
                                                    <label className="form-label">
                                                        Количество балконов:
                                                    </label>
                                                    <input
                                                        value={
                                                            formData.find((item) => item.name === "balcony_count")?.value || ""
                                                        }
                                                        type="number"
                                                        name="balcony_count"
                                                        className="form-input"
                                                        onChange={handleInputChange}
                                                    />
                                                </div>
                                                <div
                                                    className={`form-group ${missingFields.includes("lodji_count") ? "error" : ""}`}
                                                >
                                                    <label className="form-label">
                                                        Количество лоджий:
                                                    </label>
                                                    <input
                                                        value={
                                                            formData.find((item) => item.name === "lodji_count")?.value || ""
                                                        }
                                                        type="number"
                                                        name="lodji_count"
                                                        className="form-input"
                                                        onChange={handleInputChange}
                                                    />
                                                </div>
                                            </div>
                                        )}

                                        {selectedSection === "Конструктив" && (
                                            <>
                                                <div className="form-section">
                                                    <h2>Фундамент</h2>
                                                    <div className="form-grid">
                                                        <div
                                                            className={`form-group ${missingFields.includes("foundation_type") ? "error" : ""}`}
                                                        >
                                                            <label className="form-label">
                                                                Тип фундамента:
                                                            </label>
                                                            <select
                                                                value={
                                                                    formData.find((item) => item.name === "foundation_type")?.value || ""
                                                                }
                                                                name="foundation_type"
                                                                className="form-input"
                                                                onChange={handleInputChange}
                                                            >
                                                                <option value="" disabled>
                                                                    Выберите тип фундамента...
                                                                </option>
                                                                <option value="монолитный">Монолитный</option>
                                                                <option value="плавающий">Плавающий</option>
                                                                <option value="ленточный">Ленточный</option>
                                                                <option value="плитный">Плитный</option>
                                                                <option value="свайный">Свайный</option>
                                                                <option value="винтовые сваи">Винтовые сваи</option>
                                                                <option value="столбчатый">Столбчатый</option>
                                                            </select>
                                                        </div>
                                                        <div
                                                            className={`form-group ${missingFields.includes("foundation_material") ? "error" : ""}`}
                                                        >
                                                            <label className="form-label">
                                                                Материал фундамента:
                                                            </label>
                                                            <select
                                                                value={
                                                                    formData.find((item) => item.name === "foundation_material")?.value || ""
                                                                }
                                                                name="foundation_material"
                                                                className="form-input"
                                                                onChange={handleInputChange}
                                                            >
                                                                <option value="" disabled>
                                                                    Выберите материал фундамента...
                                                                </option>
                                                                <option value="бутовый">Бутовый</option>
                                                                <option value="бетонный">Бетонный</option>
                                                                <option value="бутобетонный">Бутобетонный</option>
                                                                <option value="железобетонный">Железобетонный</option>
                                                            </select>
                                                        </div>
                                                        <div
                                                            className={`form-group ${missingFields.includes("paving_area") ? "error" : ""}`}
                                                        >
                                                            <label className="form-label">
                                                                Площадь отмостки, КВ.м:
                                                            </label>
                                                            <input
                                                                value={
                                                                    formData.find((item) => item.name === "paving_area")?.value || ""
                                                                }
                                                                type="number"
                                                                name="paving_area"
                                                                className="form-input"
                                                                onChange={handleInputChange}
                                                            />
                                                        </div>
                                                        <div
                                                            className={`form-group ${missingFields.includes("foundation_wear") ? "error" : ""}`}
                                                        >
                                                            <label className="form-label">
                                                                Физический износ, % :
                                                            </label>
                                                            <input
                                                                value={
                                                                    formData.find((item) => item.name === "foundation_wear")?.value || ""
                                                                }
                                                                type="number"
                                                                name="foundation_wear"
                                                                className="form-input"
                                                                onChange={handleInputChange}
                                                            />
                                                        </div>
                                                        <div
                                                            className={`form-group ${missingFields.includes("foundation_last_repair_year") ? "error" : ""}`}
                                                        >
                                                            <label className="form-label">
                                                                Год проведения последнего капитального ремонта:
                                                            </label>
                                                            <input
                                                                value={
                                                                    formData.find((item) => item.name === "foundation_last_repair_year")?.value || ""
                                                                }
                                                                type="number"
                                                                name="foundation_last_repair_year"
                                                                className="form-input"
                                                                onChange={handleInputChange}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="form-section">
                                                    <h2>Внутренние стены</h2>
                                                    <div className="form-grid">
                                                        <div
                                                            className={`form-group ${missingFields.includes("internal_walls_type") ? "error" : ""}`}
                                                        >
                                                            <label className="form-label">
                                                                Тип внутренних стен:
                                                            </label>
                                                            <select
                                                                value={
                                                                    formData.find((item) => item.name === "internal_walls_type")?.value || ""
                                                                }
                                                                name="internal_walls_type"
                                                                className="form-input"
                                                                onChange={handleInputChange}
                                                            >
                                                                <option value="" disabled>
                                                                    Выберите тип внутренних стен ...
                                                                </option>
                                                                <option value="несущие">Несущие</option>
                                                                <option value="самонесущие">Самонесущие</option>
                                                                <option value="навесные">Навесные</option>
                                                            </select>
                                                        </div>
                                                        <div
                                                            className={`form-group ${missingFields.includes("internal_walls_material") ? "error" : ""}`}
                                                        >
                                                            <label className="form-label">
                                                                Материал внутренних стен:
                                                            </label>
                                                            <input
                                                                value={
                                                                    formData.find((item) => item.name === "internal_walls_material")?.value || ""
                                                                }
                                                                name="internal_walls_material"
                                                                className="form-input"
                                                                onChange={handleInputChange}
                                                            />
                                                        </div>
                                                        <div
                                                            className={`form-group ${missingFields.includes("internal_walls_wear") ? "error" : ""}`}
                                                        >
                                                            <label className="form-label">
                                                                Физический износ, % :
                                                            </label>
                                                            <input
                                                                value={
                                                                    formData.find((item) => item.name === "internal_walls_wear")?.value || ""
                                                                }
                                                                type="number"
                                                                name="internal_walls_wear"
                                                                className="form-input"
                                                                onChange={handleInputChange}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="form-section">
                                                    <h2>Фасад</h2>
                                                    <div className="form-grid">
                                                        <div
                                                            className={`form-group ${missingFields.includes("external_walls_type") ? "error" : ""}`}
                                                        >
                                                            <label className="form-label">
                                                                Тип наружных стен:
                                                            </label>
                                                            <select
                                                                value={
                                                                    formData.find((item) => item.name === "external_walls_type")?.value || ""
                                                                }
                                                                name="external_walls_type"
                                                                className="form-input"
                                                                onChange={handleInputChange}
                                                            >
                                                                <option value="" disabled>
                                                                    Выберите тип наружных стен...
                                                                </option>
                                                                <option value="несущие">Несущие</option>
                                                                <option value="самонесущие">Самонесущие</option>
                                                                <option value="ненесущие/фахверковые">Ненесущие/фахверковые</option>
                                                                <option value="навесные">Навесные</option>
                                                            </select>
                                                        </div>
                                                        <div
                                                            className={`form-group ${missingFields.includes("external_walls_material") ? "error" : ""}`}
                                                        >
                                                            <label className="form-label">
                                                                Материал наружных стен:
                                                            </label>
                                                            <input
                                                                value={
                                                                    formData.find((item) => item.name === "external_walls_material")?.value || ""
                                                                }
                                                                name="external_walls_material"
                                                                className="form-input"
                                                                onChange={handleInputChange}
                                                            />
                                                        </div>
                                                        <div
                                                            className={`form-group ${missingFields.includes("facade_insulation_type") ? "error" : ""}`}
                                                        >
                                                            <label className="form-label">
                                                                Тип наружного утепления фасада:
                                                            </label>
                                                            <select
                                                                value={
                                                                    formData.find((item) => item.name === "facade_insulation_type")?.value || ""
                                                                }
                                                                name="facade_insulation_type"
                                                                className="form-input"
                                                                onChange={handleInputChange}
                                                            >
                                                                <option value="" disabled>
                                                                    Выберите тип наружного утепления фасада...
                                                                </option>
                                                                <option value="навесные вентилируемые">Навесные вентилируемые</option>
                                                                <option value="слоистой (колодцевой) кладки">Слоистой (колодцевой) кладки</option>
                                                                <option value="штукатурные">Штукатурные</option>
                                                            </select>
                                                        </div>
                                                        <div
                                                            className={`form-group ${missingFields.includes("facade_cladding_material") ? "error" : ""}`}
                                                        >
                                                            <label className="form-label">
                                                                Материал отделки фасада:
                                                            </label>
                                                            <input
                                                                value={
                                                                    formData.find((item) => item.name === "facade_cladding_material")?.value || ""
                                                                }
                                                                name="facade_cladding_material"
                                                                className="form-input"
                                                                onChange={handleInputChange}
                                                            />
                                                        </div>
                                                        <div
                                                            className={`form-group ${missingFields.includes("external_walls_wear") ? "error" : ""}`}
                                                        >
                                                            <label className="form-label">
                                                                Физический износ наружных стен, %:
                                                            </label>
                                                            <input
                                                                value={
                                                                    formData.find((item) => item.name === "external_walls_wear")?.value || ""
                                                                }
                                                                type="number"
                                                                name="external_walls_wear"
                                                                className="form-input"
                                                                onChange={handleInputChange}
                                                            />
                                                        </div>
                                                        <div
                                                            className={`form-group ${missingFields.includes("facade_last_repair_year") ? "error" : ""}`}
                                                        >
                                                            <label className="form-label">
                                                                Год проведения последнего капитального ремонта:
                                                            </label>
                                                            <input
                                                                value={
                                                                    formData.find((item) => item.name === "facade_last_repair_year")?.value || ""
                                                                }
                                                                type="number"
                                                                name="facade_last_repair_year"
                                                                className="form-input"
                                                                onChange={handleInputChange}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="form-section">
                                                    <h2>Перекрытия</h2>
                                                    <div className="form-grid">
                                                        <div
                                                            className={`form-group ${missingFields.includes("floor_type") ? "error" : ""}`}
                                                        >
                                                            <label className="form-label">
                                                                Тип перекрытий:
                                                            </label>
                                                            <select
                                                                value={
                                                                    formData.find((item) => item.name === "floor_type")?.value || ""
                                                                }
                                                                name="floor_type"
                                                                className="form-input"
                                                                onChange={handleInputChange}
                                                            >
                                                                <option value="" disabled>
                                                                    Выберите тип перекрытий...
                                                                </option>
                                                                <option value="балочные">Балочные</option>
                                                                <option value="плитные">Плитные</option>
                                                                <option value="безбалочные">Безбалочные</option>
                                                            </select>
                                                        </div>
                                                        <div
                                                            className={`form-group ${missingFields.includes("floor_structure") ? "error" : ""}`}
                                                        >
                                                            <label className="form-label">
                                                                Конструкция перекрытий:
                                                            </label>
                                                            <select
                                                                value={
                                                                    formData.find((item) => item.name === "floor_structure")?.value || ""
                                                                }
                                                                name="floor_structure"
                                                                className="form-input"
                                                                onChange={handleInputChange}
                                                            >
                                                                <option value="" disabled>
                                                                    Выберите конструкцию перекрытий...
                                                                </option>
                                                                <option value="сборная">Сборная</option>
                                                                <option value="монолитная">Монолитная</option>
                                                                <option value="сборно-монолитная">Сборно-монолитная</option>
                                                                <option value="из дервянных балок">Из дервянных балок</option>
                                                                <option value="из металлических балок">Из металлических балок</option>
                                                                <option value="железобетонные">Железобетонные</option>
                                                            </select>
                                                        </div>
                                                        <div
                                                            className={`form-group ${missingFields.includes("floor_wear") ? "error" : ""}`}
                                                        >
                                                            <label className="form-label">
                                                                Физический износ, % :
                                                            </label>
                                                            <input
                                                                value={
                                                                    formData.find((item) => item.name === "floor_wear")?.value || ""
                                                                }
                                                                type="number"
                                                                name="floor_wear"
                                                                className="form-input"
                                                                onChange={handleInputChange}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="form-section">
                                                    <h2>Крыша</h2>
                                                    <div className="form-grid">
                                                        <div
                                                            className={`form-group ${missingFields.includes("roof_shape") ? "error" : ""}`}
                                                        >
                                                            <label className="form-label">
                                                                Форма крыши:
                                                            </label>
                                                            <select
                                                                value={
                                                                    formData.find((item) => item.name === "roof_shape")?.value || ""
                                                                }
                                                                name="roof_shape"
                                                                className="form-input"
                                                                onChange={handleInputChange}
                                                            >
                                                                <option value="" disabled>
                                                                    Выберите форму крыши...
                                                                </option>
                                                                <option value="односкатная">Односкатная</option>
                                                                <option value="двускатная">Двускатная</option>
                                                                <option value="четырехскатная">Четырехскатная</option>
                                                                <option value="многоскатная">Многоскатная</option>
                                                                <option value="плоская">Плоская</option>
                                                            </select>
                                                        </div>
                                                        <div
                                                            className={`form-group ${missingFields.includes("roof_structure_type") ? "error" : ""}`}
                                                        >
                                                            <label className="form-label">
                                                                Вид несущей части:
                                                            </label>
                                                            <input
                                                                value={
                                                                    formData.find((item) => item.name === "roof_structure_type")?.value || ""
                                                                }
                                                                name="roof_structure_type"
                                                                className="form-input"
                                                                onChange={handleInputChange}
                                                            />
                                                        </div>
                                                        <div
                                                            className={`form-group ${missingFields.includes("roof_structure_wear") ? "error" : ""}`}
                                                        >
                                                            <label className="form-label">
                                                                Физический износ, % :
                                                            </label>
                                                            <input
                                                                value={
                                                                    formData.find((item) => item.name === "roof_structure_wear")?.value || ""
                                                                }
                                                                type="number"
                                                                name="roof_structure_wear"
                                                                className="form-input"
                                                                onChange={handleInputChange}
                                                            />
                                                        </div>
                                                        <div
                                                            className={`form-group ${missingFields.includes("roof_last_repair_year") ? "error" : ""}`}
                                                        >
                                                            <label className="form-label">
                                                                Год проведения последнего капитального ремонта:
                                                            </label>
                                                            <input
                                                                value={
                                                                    formData.find((item) => item.name === "roof_last_repair_year")?.value || ""
                                                                }
                                                                type="number"
                                                                name="roof_last_repair_year"
                                                                className="form-input"
                                                                onChange={handleInputChange}
                                                            />
                                                        </div>
                                                        <div
                                                            className={`form-group ${missingFields.includes("attic_insulation") ? "error" : ""}`}
                                                        >
                                                            <label className="form-label">
                                                                Утепляющие слои чердачных перекрытий:
                                                            </label>
                                                            <input
                                                                value={
                                                                    formData.find((item) => item.name === "attic_insulation")?.value || ""
                                                                }
                                                                name="attic_insulation"
                                                                className="form-input"
                                                                onChange={handleInputChange}
                                                            />
                                                        </div>
                                                        <div
                                                            className={`form-group ${missingFields.includes("roof_cover_type") ? "error" : ""}`}
                                                        >
                                                            <label className="form-label">
                                                                Тип кровли:
                                                            </label>
                                                            <select
                                                                value={
                                                                    formData.find((item) => item.name === "roof_cover_type")?.value || ""
                                                                }
                                                                name="roof_cover_type"
                                                                className="form-input"
                                                                onChange={handleInputChange}
                                                            >
                                                                <option value="" disabled>
                                                                    Выберите тип кровли...
                                                                </option>
                                                                <option value="листовые материалы">Листовые материалы</option>
                                                                <option value="мягкие покрытия">Мягкие покрытия</option>
                                                                <option value="штучная отделка">Штучная отделка</option>
                                                                <option value="наливная">Наливная</option>
                                                            </select>
                                                        </div>
                                                        <div
                                                            className={`form-group ${missingFields.includes("roof_cover_wear") ? "error" : ""}`}
                                                        >
                                                            <label className="form-label">
                                                                Физический износ, % :
                                                            </label>
                                                            <input
                                                                value={
                                                                    formData.find((item) => item.name === "roof_cover_wear")?.value || ""
                                                                }
                                                                type="number"
                                                                name="roof_cover_wear"
                                                                className="form-input"
                                                                onChange={handleInputChange}
                                                            />
                                                        </div>
                                                        <div
                                                            className={`form-group ${missingFields.includes("roof_cover_last_repair_year") ? "error" : ""}`}
                                                        >
                                                            <label className="form-label">
                                                                Год проведения последнего капитального ремонта:
                                                            </label>
                                                            <input
                                                                value={
                                                                    formData.find((item) => item.name === "roof_cover_last_repair_year")?.value || ""
                                                                }
                                                                type="number"
                                                                name="roof_cover_last_repair_year"
                                                                className="form-input"
                                                                onChange={handleInputChange}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="form-section">
                                                    <h2>Окна</h2>
                                                    <div className="form-grid">
                                                        <div
                                                            className={`form-group ${missingFields.includes("windows_wear") ? "error" : ""}`}
                                                        >
                                                            <label className="form-label">
                                                                Физический износ окон, % :
                                                            </label>
                                                            <input
                                                                value={
                                                                    formData.find((item) => item.name === "windows_wear")?.value || ""
                                                                }
                                                                type="number"
                                                                name="windows_wear"
                                                                className="form-input"
                                                                onChange={handleInputChange}
                                                            />
                                                        </div>
                                                        <div
                                                            className={`form-group ${missingFields.includes("windows_material") ? "error" : ""}`}
                                                        >
                                                            <label className="form-label">
                                                                Материал окон:
                                                            </label>
                                                            <input
                                                                value={
                                                                    formData.find((item) => item.name === "windows_material")?.value || ""
                                                                }
                                                                name="windows_material"
                                                                className="form-input"
                                                                onChange={handleInputChange}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="form-section">
                                                    <h2>Двери</h2>
                                                    <div className="form-grid">
                                                        <div
                                                            className={`form-group ${missingFields.includes("doors_wear") ? "error" : ""}`}
                                                        >
                                                            <label className="form-label">
                                                                Физический износ дверей, % :
                                                            </label>
                                                            <input
                                                                value={
                                                                    formData.find((item) => item.name === "doors_wear")?.value || ""
                                                                }
                                                                type="number"
                                                                name="doors_wear"
                                                                className="form-input"
                                                                onChange={handleInputChange}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="form-section">
                                                    <h2>Отделочные покрытия помещений общего пользования</h2>
                                                    <div className="form-grid">
                                                        <div
                                                            className={`form-group ${missingFields.includes("common_area_wear") ? "error" : ""}`}
                                                        >
                                                            <label className="form-label">
                                                                Физический износ отделочных покрытий помещений общего пользования, % :
                                                            </label>
                                                            <input
                                                                value={
                                                                    formData.find((item) => item.name === "common_area_wear")?.value || ""
                                                                }
                                                                type="number"
                                                                name="common_area_wear"
                                                                className="form-input"
                                                                onChange={handleInputChange}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="form-section">
                                                    <h2>Другие конструктивные элементы общественного здания</h2>
                                                    <div className="form-grid">
                                                        <div
                                                            className={`form-group ${missingFields.includes("element_name") ? "error" : ""}`}
                                                        >
                                                            <label className="form-label">
                                                                Наименование конструктивного элемента:
                                                            </label>
                                                            <input
                                                                value={
                                                                    formData.find((item) => item.name === "element_name")?.value || ""
                                                                }
                                                                name="element_name"
                                                                className="form-input"
                                                                onChange={handleInputChange}
                                                            />
                                                        </div>
                                                        <div
                                                            className={`form-group ${missingFields.includes("element_wear") ? "error" : ""}`}
                                                        >
                                                            <label className="form-label">
                                                                Физический износ, % :
                                                            </label>
                                                            <input
                                                                value={
                                                                    formData.find((item) => item.name === "element_wear")?.value || ""
                                                                }
                                                                type="number"
                                                                name="element_wear"
                                                                className="form-input"
                                                                onChange={handleInputChange}
                                                            />
                                                        </div>
                                                        <div
                                                            className={`form-group ${missingFields.includes("element_last_repair_year") ? "error" : ""}`}
                                                        >
                                                            <label className="form-label">
                                                                Год проведения последнего капитального ремонта:
                                                            </label>
                                                            <input
                                                                value={
                                                                    formData.find((item) => item.name === "element_last_repair_year")?.value || ""
                                                                }
                                                                type="number"
                                                                name="element_last_repair_year"
                                                                className="form-input"
                                                                onChange={handleInputChange}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </>

                                        )}

                                        {selectedSection === "Инженерные сети" && (
                                            <>
                                                <div className="form-section">
                                                    <h2>Внутридомовая система отопления</h2>
                                                    <div className="form-grid">
                                                        <div
                                                            className={`form-group ${missingFields.includes("heating_wear") ? "error" : ""}`}
                                                        >
                                                            <label className="form-label">
                                                                Физический износ, % :
                                                            </label>
                                                            <input
                                                                value={
                                                                    formData.find((item) => item.name === "heating_wear")?.value || ""
                                                                }
                                                                type="number"
                                                                name="heating_wear"
                                                                className="form-input"
                                                                onChange={handleInputChange}
                                                            />
                                                        </div>
                                                        <div
                                                            className={`form-group ${missingFields.includes("heating_last_repair_year") ? "error" : ""}`}
                                                        >
                                                            <label className="form-label">
                                                                Год проведения последнего капитального ремонта:
                                                            </label>
                                                            <input
                                                                value={
                                                                    formData.find((item) => item.name === "heating_last_repair_year")?.value || ""
                                                                }
                                                                type="number"
                                                                name="heating_last_repair_year"
                                                                className="form-input"
                                                                onChange={handleInputChange}
                                                            />
                                                        </div>
                                                        <div
                                                            className={`form-group ${missingFields.includes("heating_system_type") ? "error" : ""}`}
                                                        >
                                                            <label className="form-label">
                                                                Тип внутридомовой системы отопления:
                                                            </label>
                                                            <input
                                                                value={
                                                                    formData.find((item) => item.name === "heating_system_type")?.value || ""
                                                                }
                                                                name="heating_system_type"
                                                                className="form-input"
                                                                onChange={handleInputChange}
                                                            />
                                                        </div>
                                                        <div
                                                            className={`form-group ${missingFields.includes("heat_source_type") ? "error" : ""}`}
                                                        >
                                                            <label className="form-label" title="Тип теплоисточника или теплоносителя внутридомовой системы отопления">
                                                                Тип теплоисточника или теплоносителя внутридомовой системы отопления:
                                                            </label>
                                                            <input
                                                                value={
                                                                    formData.find((item) => item.name === "heat_source_type")?.value || ""
                                                                }
                                                                name="heat_source_type"
                                                                className="form-input"
                                                                onChange={handleInputChange}
                                                            />
                                                        </div>
                                                        <div
                                                            className={`form-group ${missingFields.includes("heating_inlets_count") ? "error" : ""}`}
                                                        >
                                                            <label className="form-label" title="Количество вводов системы отопления в здание (количество точек поставки)">
                                                                Количество вводов системы отопления в здание (количество точек поставки):
                                                            </label>
                                                            <input
                                                                value={
                                                                    formData.find((item) => item.name === "heating_inlets_count")?.value || ""
                                                                }
                                                                type="number"
                                                                name="heating_inlets_count"
                                                                className="form-input"
                                                                onChange={handleInputChange}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="form-section">
                                                    <h2>Сеть внутридомовой системы отопления</h2>
                                                    <div className="form-grid">
                                                        <div
                                                            className={`form-group ${missingFields.includes("network_wear") ? "error" : ""}`}
                                                        >
                                                            <label className="form-label">
                                                                Физический износ, % :
                                                            </label>
                                                            <input
                                                                value={
                                                                    formData.find((item) => item.name === "network_wear")?.value || ""
                                                                }
                                                                type="number"
                                                                name="network_wear"
                                                                className="form-input"
                                                                onChange={handleInputChange}
                                                            />
                                                        </div>
                                                        <div
                                                            className={`form-group ${missingFields.includes("network_material") ? "error" : ""}`}
                                                        >
                                                            <label className="form-label">
                                                                Материал сети:
                                                            </label>
                                                            <input
                                                                value={
                                                                    formData.find((item) => item.name === "network_material")?.value || ""
                                                                }
                                                                name="network_material"
                                                                className="form-input"
                                                                onChange={handleInputChange}
                                                            />
                                                        </div>
                                                        <div
                                                            className={`form-group ${missingFields.includes("network_insulation_material") ? "error" : ""}`}
                                                        >
                                                            <label className="form-label">
                                                                Материал теплоизоляции сети:
                                                            </label>
                                                            <input
                                                                value={
                                                                    formData.find((item) => item.name === "network_insulation_material")?.value || ""
                                                                }
                                                                name="network_insulation_material"
                                                                className="form-input"
                                                                onChange={handleInputChange}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="form-section">
                                                    <h2>Стояки</h2>
                                                    <div className="form-grid">
                                                        <div
                                                            className={`form-group ${missingFields.includes("risers_wear") ? "error" : ""}`}
                                                        >
                                                            <label className="form-label">
                                                                Физический износ, % :
                                                            </label>
                                                            <input
                                                                value={
                                                                    formData.find((item) => item.name === "risers_wear")?.value || ""
                                                                }
                                                                type="number"
                                                                name="risers_wear"
                                                                className="form-input"
                                                                onChange={handleInputChange}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="form-section">
                                                    <h2>Запорная арматура</h2>
                                                    <div className="form-grid">
                                                        <div
                                                            className={`form-group ${missingFields.includes("valves_wear") ? "error" : ""}`}
                                                        >
                                                            <label className="form-label">
                                                                Физический износ, % :
                                                            </label>
                                                            <input
                                                                value={
                                                                    formData.find((item) => item.name === "valves_wear")?.value || ""
                                                                }
                                                                type="number"
                                                                name="valves_wear"
                                                                className="form-input"
                                                                onChange={handleInputChange}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="form-section">
                                                    <h2>Отопительные приборы</h2>
                                                    <div className="form-grid">
                                                        <div
                                                            className={`form-group ${missingFields.includes("radiators_wear") ? "error" : ""}`}
                                                        >
                                                            <label className="form-label">
                                                                Физический износ, % :
                                                            </label>
                                                            <input
                                                                value={
                                                                    formData.find((item) => item.name === "radiators_wear")?.value || ""
                                                                }
                                                                type="number"
                                                                name="radiators_wear"
                                                                className="form-input"
                                                                onChange={handleInputChange}
                                                            />
                                                        </div>
                                                        <div
                                                            className={`form-group ${missingFields.includes("radiators_type") ? "error" : ""}`}
                                                        >
                                                            <label className="form-label">
                                                                Тип отопительных приборов:
                                                            </label>
                                                            <select
                                                                value={
                                                                    formData.find((item) => item.name === "radiators_type")?.value || ""
                                                                }
                                                                name="radiators_type"
                                                                className="form-input"
                                                                onChange={handleInputChange}
                                                            >
                                                                <option value="" disabled>
                                                                    Выберите тип отопительных приборов...
                                                                </option>
                                                                <option value="радиаторы">Радиаторы</option>
                                                                <option value="конвекторы">Конвекторы</option>
                                                                <option value="полотенцесушители">Полотенцесушители</option>
                                                                <option value="стеновые панели">Стеновые панели</option>
                                                                <option value="тёплые полы">Тёплые полы</option>
                                                                <option value="инфракрасные излучатели">Инфракрасные излучатели</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="form-section">
                                                    <h2>Печи, камины и очаги</h2>
                                                    <div className="form-grid">
                                                        <div
                                                            className={`form-group ${missingFields.includes("stoves_wear") ? "error" : ""}`}
                                                        >
                                                            <label className="form-label">
                                                                Физический износ, % :
                                                            </label>
                                                            <input
                                                                value={
                                                                    formData.find((item) => item.name === "stoves_wear")?.value || ""
                                                                }
                                                                type="number"
                                                                name="stoves_wear"
                                                                className="form-input"
                                                                onChange={handleInputChange}
                                                            />
                                                        </div>
                                                        <div
                                                            className={`form-group ${missingFields.includes("stoves_last_repair_year") ? "error" : ""}`}
                                                        >
                                                            <label className="form-label">
                                                                Год проведения последнего капитального ремонта:
                                                            </label>
                                                            <input
                                                                value={
                                                                    formData.find((item) => item.name === "stoves_last_repair_year")?.value || ""
                                                                }
                                                                type="number"
                                                                name="stoves_last_repair_year"
                                                                className="form-input"
                                                                onChange={handleInputChange}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="form-section">
                                                    <h2>Внутридомовая инженерная система холодного водоснабжения</h2>
                                                    <div className="form-grid">
                                                        <div
                                                            className={`form-group ${missingFields.includes("cold_water_wear") ? "error" : ""}`}
                                                        >
                                                            <label className="form-label">
                                                                Физический износ, % :
                                                            </label>
                                                            <input
                                                                value={
                                                                    formData.find((item) => item.name === "cold_water_wear")?.value || ""
                                                                }
                                                                type="number"
                                                                name="cold_water_wear"
                                                                className="form-input"
                                                                onChange={handleInputChange}
                                                            />
                                                        </div>
                                                        <div
                                                            className={`form-group ${missingFields.includes("cold_water_last_repair_year") ? "error" : ""}`}
                                                        >
                                                            <label className="form-label">
                                                                Год проведения последнего капитального ремонта:
                                                            </label>
                                                            <input
                                                                value={
                                                                    formData.find((item) => item.name === "cold_water_last_repair_year")?.value || ""
                                                                }
                                                                type="number"
                                                                name="cold_water_last_repair_year"
                                                                className="form-input"
                                                                onChange={handleInputChange}
                                                            />
                                                        </div>
                                                        <div
                                                            className={`form-group ${missingFields.includes("cold_water_system_type") ? "error" : ""}`}
                                                        >
                                                            <label className="form-label" title="Тип внутридомовой инженерной системы холодного водоснабжения">
                                                                Тип внутридомовой инженерной системы холодного водоснабжения:
                                                            </label>
                                                            <select
                                                                value={
                                                                    formData.find((item) => item.name === "cold_water_system_type")?.value || ""
                                                                }
                                                                name="cold_water_system_type"
                                                                className="form-input"
                                                                onChange={handleInputChange}
                                                            >
                                                                <option value="" disabled>
                                                                    Выберите тип внутридомовой инженерной системы холодного водоснабжения...
                                                                </option>
                                                                <option value="хозяйственно-питьевая">Хозяйственно-питьевая</option>
                                                                <option value="противопожарная/производственная">Противопожарная/производственная</option>
                                                                <option value="совмещенная">Совмещенная</option>
                                                            </select>
                                                        </div>
                                                        <div
                                                            className={`form-group ${missingFields.includes("cold_water_inlets_count") ? "error" : ""}`}
                                                        >
                                                            <label className="form-label" title="Количество вводов внутридомовой инженерной системы холодного водоснабжения в здание (количество точек поставки)">
                                                                Количество вводов внутридомовой инженерной системы холодного водоснабжения в здание (количество точек поставки):
                                                            </label>
                                                            <input
                                                                value={
                                                                    formData.find((item) => item.name === "cold_water_inlets_count")?.value || ""
                                                                }
                                                                type="number"
                                                                name="cold_water_inlets_count"
                                                                className="form-input"
                                                                onChange={handleInputChange}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="form-section">
                                                    <h2>Сеть внутридомовой инженерной системы холодного водоснабжения</h2>
                                                    <div className="form-grid">
                                                        <div
                                                            className={`form-group ${missingFields.includes("cold_water_network_wear") ? "error" : ""}`}
                                                        >
                                                            <label className="form-label">
                                                                Физический износ, % :
                                                            </label>
                                                            <input
                                                                value={
                                                                    formData.find((item) => item.name === "cold_water_network_wear")?.value || ""
                                                                }
                                                                type="number"
                                                                name="cold_water_network_wear"
                                                                className="form-input"
                                                                onChange={handleInputChange}
                                                            />
                                                        </div>
                                                        <div
                                                            className={`form-group ${missingFields.includes("cold_water_network_material") ? "error" : ""}`}
                                                        >
                                                            <label className="form-label">
                                                                Материал сети:
                                                            </label>
                                                            <input
                                                                value={
                                                                    formData.find((item) => item.name === "cold_water_network_material")?.value || ""
                                                                }
                                                                name="cold_water_network_material"
                                                                className="form-input"
                                                                onChange={handleInputChange}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="form-section">
                                                    <h2>Стояки</h2>
                                                    <div className="form-grid">
                                                        <div
                                                            className={`form-group ${missingFields.includes("only_cold_water_risers_wear") ? "error" : ""}`}
                                                        >
                                                            <label className="form-label">
                                                                Физический износ, % :
                                                            </label>
                                                            <input
                                                                value={
                                                                    formData.find((item) => item.name === "only_cold_water_risers_wear")?.value || ""
                                                                }
                                                                type="number"
                                                                name="only_cold_water_risers_wear"
                                                                className="form-input"
                                                                onChange={handleInputChange}
                                                            />
                                                        </div>
                                                        <div
                                                            className={`form-group ${missingFields.includes("only_cold_water_risers_material") ? "error" : ""}`}
                                                        >
                                                            <label className="form-label">
                                                                Материал:
                                                            </label>
                                                            <input
                                                                value={
                                                                    formData.find((item) => item.name === "only_cold_water_risers_material")?.value || ""
                                                                }
                                                                name="only_cold_water_risers_material"
                                                                className="form-input"
                                                                onChange={handleInputChange}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="form-section">
                                                    <h2>Запорная арматура</h2>
                                                    <div className="form-grid">
                                                        <div
                                                            className={`form-group ${missingFields.includes("only_cold_water_valves_wear") ? "error" : ""}`}
                                                        >
                                                            <label className="form-label">
                                                                Физический износ, % :
                                                            </label>
                                                            <input
                                                                value={
                                                                    formData.find((item) => item.name === "only_cold_water_valves_wear")?.value || ""
                                                                }
                                                                type="number"
                                                                name="only_cold_water_valves_wear"
                                                                className="form-input"
                                                                onChange={handleInputChange}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="form-section">
                                                    <h2>Внутридомовая инженерная система горячего водоснабжения</h2>
                                                    <div className="form-grid">
                                                        <div
                                                            className={`form-group ${missingFields.includes("hot_water_wear") ? "error" : ""}`}
                                                        >
                                                            <label className="form-label">
                                                                Физический износ, % :
                                                            </label>
                                                            <input
                                                                value={
                                                                    formData.find((item) => item.name === "hot_water_wear")?.value || ""
                                                                }
                                                                type="number"
                                                                name="hot_water_wear"
                                                                className="form-input"
                                                                onChange={handleInputChange}
                                                            />
                                                        </div>
                                                        <div
                                                            className={`form-group ${missingFields.includes("hot_water_last_repair_year") ? "error" : ""}`}
                                                        >
                                                            <label className="form-label">
                                                                Год проведения последнего капитального ремонта:
                                                            </label>
                                                            <input
                                                                value={
                                                                    formData.find((item) => item.name === "hot_water_last_repair_year")?.value || ""
                                                                }
                                                                type="number"
                                                                name="hot_water_last_repair_year"
                                                                className="form-input"
                                                                onChange={handleInputChange}
                                                            />
                                                        </div>
                                                        <div
                                                            className={`form-group ${missingFields.includes("hot_water_system_type") ? "error" : ""}`}
                                                        >
                                                            <label className="form-label" title="Тип внутридомовой инженерной системы горячего водоснабжения">
                                                                Тип внутридомовой инженерной системы горячего водоснабжения:
                                                            </label>
                                                            <select
                                                                value={
                                                                    formData.find((item) => item.name === "hot_water_system_type")?.value || ""
                                                                }
                                                                name="hot_water_system_type"
                                                                className="form-input"
                                                                onChange={handleInputChange}
                                                            >
                                                                <option value="" disabled>
                                                                    Выберите тип внутридомовой инженерной системы горячего водоснабжения...
                                                                </option>
                                                                <option value="открытая">Открытая</option>
                                                                <option value="закрытая">Закрытая</option>
                                                            </select>
                                                        </div>
                                                        <div
                                                            className={`form-group ${missingFields.includes("hot_water_inlets_count") ? "error" : ""}`}
                                                        >
                                                            <label className="form-label" title="Количество вводов внутридомовой инженерной системы горячего водоснабжения в здание (количество точек поставки)">
                                                                Количество вводов внутридомовой инженерной системы горячего водоснабжения в здание (количество точек поставки):
                                                            </label>
                                                            <input
                                                                value={
                                                                    formData.find((item) => item.name === "hot_water_inlets_count")?.value || ""
                                                                }
                                                                type="number"
                                                                name="hot_water_inlets_count"
                                                                className="form-input"
                                                                onChange={handleInputChange}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="form-section">
                                                    <h2>Сеть внутридомовой инженерной системы горячего водоснабжения</h2>
                                                    <div className="form-grid">
                                                        <div
                                                            className={`form-group ${missingFields.includes("hot_water_network_wear") ? "error" : ""}`}
                                                        >
                                                            <label className="form-label">
                                                                Физический износ, % :
                                                            </label>
                                                            <input
                                                                value={
                                                                    formData.find((item) => item.name === "hot_water_network_wear")?.value || ""
                                                                }
                                                                type="number"
                                                                name="hot_water_network_wear"
                                                                className="form-input"
                                                                onChange={handleInputChange}
                                                            />
                                                        </div>
                                                        <div
                                                            className={`form-group ${missingFields.includes("only_hot_water_network_material") ? "error" : ""}`}
                                                        >
                                                            <label className="form-label">
                                                                Материал сети:
                                                            </label>
                                                            <input
                                                                value={
                                                                    formData.find((item) => item.name === "only_hot_water_network_material")?.value || ""
                                                                }
                                                                name="only_hot_water_network_material"
                                                                className="form-input"
                                                                onChange={handleInputChange}
                                                            />
                                                        </div>
                                                        <div
                                                            className={`form-group ${missingFields.includes("only_hot_water_network_network_insulation_material") ? "error" : ""}`}
                                                        >
                                                            <label className="form-label">
                                                                Материал теплоизоляции сети:
                                                            </label>
                                                            <input
                                                                value={
                                                                    formData.find((item) => item.name === "only_hot_water_network_network_insulation_material")?.value || ""
                                                                }
                                                                name="only_hot_water_network_network_insulation_material"
                                                                className="form-input"
                                                                onChange={handleInputChange}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="form-section">
                                                    <h2>Стояки</h2>
                                                    <div className="form-grid">
                                                        <div
                                                            className={`form-group ${missingFields.includes("only_hot_water_risers_wear") ? "error" : ""}`}
                                                        >
                                                            <label className="form-label">
                                                                Физический износ, % :
                                                            </label>
                                                            <input
                                                                value={
                                                                    formData.find((item) => item.name === "only_hot_water_risers_wear")?.value || ""
                                                                }
                                                                type="number"
                                                                name="only_hot_water_risers_wear"
                                                                className="form-input"
                                                                onChange={handleInputChange}
                                                            />
                                                        </div>
                                                        <div
                                                            className={`form-group ${missingFields.includes("only_hot_water_risers_material") ? "error" : ""}`}
                                                        >
                                                            <label className="form-label">
                                                                Материал:
                                                            </label>
                                                            <input
                                                                value={
                                                                    formData.find((item) => item.name === "only_hot_water_risers_material")?.value || ""
                                                                }
                                                                name="only_hot_water_risers_material"
                                                                className="form-input"
                                                                onChange={handleInputChange}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="form-section">
                                                    <h2>Запорная арматура</h2>
                                                    <div className="form-grid">
                                                        <div
                                                            className={`form-group ${missingFields.includes("only_hot_water_valves_wear") ? "error" : ""}`}
                                                        >
                                                            <label className="form-label">
                                                                Физический износ, % :
                                                            </label>
                                                            <input
                                                                value={
                                                                    formData.find((item) => item.name === "only_hot_water_valves_wear")?.value || ""
                                                                }
                                                                type="number"
                                                                name="only_hot_water_valves_wear"
                                                                className="form-input"
                                                                onChange={handleInputChange}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>


                                                <div className="form-section">
                                                    <h2>Внутридомовая инженерная система водоотведения</h2>
                                                    <div className="form-grid">
                                                        <div
                                                            className={`form-group ${missingFields.includes("wastewater_wear") ? "error" : ""}`}
                                                        >
                                                            <label className="form-label">
                                                                Физический износ, % :
                                                            </label>
                                                            <input
                                                                value={
                                                                    formData.find((item) => item.name === "wastewater_wear")?.value || ""
                                                                }
                                                                type="number"
                                                                name="wastewater_wear"
                                                                className="form-input"
                                                                onChange={handleInputChange}
                                                            />
                                                        </div>
                                                        <div
                                                            className={`form-group ${missingFields.includes("wastewater_last_repair_year") ? "error" : ""}`}
                                                        >
                                                            <label className="form-label">
                                                                Год проведения последнего капитального ремонта:
                                                            </label>
                                                            <input
                                                                value={
                                                                    formData.find((item) => item.name === "wastewater_last_repair_year")?.value || ""
                                                                }
                                                                type="number"
                                                                name="wastewater_last_repair_year"
                                                                className="form-input"
                                                                onChange={handleInputChange}
                                                            />
                                                        </div>
                                                        <div
                                                            className={`form-group ${missingFields.includes("wastewater_system_type") ? "error" : ""}`}
                                                        >
                                                            <label className="form-label" title="Тип внутридомовой инженерной системы водоотведения ">
                                                                Тип внутридомовой инженерной системы водоотведения:
                                                            </label>
                                                            <select
                                                                value={
                                                                    formData.find((item) => item.name === "wastewater_system_type")?.value || ""
                                                                }
                                                                name="wastewater_system_type"
                                                                className="form-input"
                                                                onChange={handleInputChange}
                                                            >
                                                                <option value="" disabled>
                                                                    Выберите тип внутридомовой инженерной системы водоотведения...
                                                                </option>
                                                                <option value="централизованная канализация">Централизованная канализация</option>
                                                                <option value="выгребная яма">Выгребная яма</option>
                                                                <option value="локальная канализация (септик)">Локальная канализация (септик)</option>
                                                            </select>
                                                        </div>
                                                        <div
                                                            className={`form-group ${missingFields.includes("wastewater_system_material") ? "error" : ""}`}
                                                        >
                                                            <label className="form-label">
                                                                Материал сети:
                                                            </label>
                                                            <input
                                                                value={
                                                                    formData.find((item) => item.name === "wastewater_system_material")?.value || ""
                                                                }
                                                                name="wastewater_system_material"
                                                                className="form-input"
                                                                onChange={handleInputChange}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="form-section">
                                                    <h2>Внутридомовая инженерная система газоснабжения</h2>
                                                    <div className="form-grid">
                                                        <div
                                                            className={`form-group ${missingFields.includes("gas_last_repair_year") ? "error" : ""}`}
                                                        >
                                                            <label className="form-label">
                                                                Год проведения последнего капитального ремонта:
                                                            </label>
                                                            <input
                                                                value={
                                                                    formData.find((item) => item.name === "gas_last_repair_year")?.value || ""
                                                                }
                                                                type="number"
                                                                name="gas_last_repair_year"
                                                                className="form-input"
                                                                onChange={handleInputChange}
                                                            />
                                                        </div>
                                                        <div
                                                            className={`form-group ${missingFields.includes("gas_system_type") ? "error" : ""}`}
                                                        >
                                                            <label className="form-label" title="Тип внутридомовой инженерной системы газоснабжения">
                                                                Тип внутридомовой инженерной системы газоснабжения:
                                                            </label>
                                                            <select
                                                                value={
                                                                    formData.find((item) => item.name === "gas_system_type")?.value || ""
                                                                }
                                                                name="gas_system_type"
                                                                className="form-input"
                                                                onChange={handleInputChange}
                                                            >
                                                                <option value="" disabled>
                                                                    Выберите тип внутридомовой инженерной системы газоснабжения...
                                                                </option>
                                                                <option value="централизованная">Централизованная</option>
                                                                <option value="автономная">Автономная</option>
                                                            </select>
                                                        </div>
                                                        <div
                                                            className={`form-group ${missingFields.includes("gas_inlets_count") ? "error" : ""}`}
                                                        >
                                                            <label className="form-label" title="Количество вводов внутридомовой инженерной системы газоснабжения в здание (количество точек поставки)">
                                                                Количество вводов внутридомовой инженерной системы газоснабжения в здание (количество точек поставки):
                                                            </label>
                                                            <input
                                                                value={
                                                                    formData.find((item) => item.name === "gas_inlets_count")?.value || ""
                                                                }
                                                                type="number"
                                                                name="gas_inlets_count"
                                                                className="form-input"
                                                                onChange={handleInputChange}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="form-section">
                                                    <h2>Внутридомовая инженерная система электроснабжения</h2>
                                                    <div className="form-grid">
                                                        <div
                                                            className={`form-group ${missingFields.includes("electricity_wear") ? "error" : ""}`}
                                                        >
                                                            <label className="form-label">
                                                                Физический износ, % :
                                                            </label>
                                                            <input
                                                                value={
                                                                    formData.find((item) => item.name === "electricity_wear")?.value || ""
                                                                }
                                                                type="number"
                                                                name="electricity_wear"
                                                                className="form-input"
                                                                onChange={handleInputChange}
                                                            />
                                                        </div>
                                                        <div
                                                            className={`form-group ${missingFields.includes("electricity_last_repair_year") ? "error" : ""}`}
                                                        >
                                                            <label className="form-label">
                                                                Год проведения последнего капитального ремонта:
                                                            </label>
                                                            <input
                                                                value={
                                                                    formData.find((item) => item.name === "electricity_last_repair_year")?.value || ""
                                                                }
                                                                type="number"
                                                                name="electricity_last_repair_year"
                                                                className="form-input"
                                                                onChange={handleInputChange}
                                                            />
                                                        </div>
                                                        <div
                                                            className={`form-group ${missingFields.includes("electricity_inlets_count") ? "error" : ""}`}
                                                        >
                                                            <label className="form-label" title="Количество вводов внутридомовой инженерной системы электроснабжения в здание(количество точек поставки)">
                                                                Количество вводов внутридомовой инженерной системы электроснабжения в здание(количество точек поставки):
                                                            </label>
                                                            <input
                                                                value={
                                                                    formData.find((item) => item.name === "electricity_inlets_count")?.value || ""
                                                                }
                                                                type="number"
                                                                name="electricity_inlets_count"
                                                                className="form-input"
                                                                onChange={handleInputChange}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="form-section">
                                                    <h2>Балконы, лоджии, козырьки и эркеры</h2>
                                                    <div className="form-grid">
                                                        <div
                                                            className={`form-group ${missingFields.includes("balconies_wear") ? "error" : ""}`}
                                                        >
                                                            <label className="form-label">
                                                                Физический износ, % :
                                                            </label>
                                                            <input
                                                                value={
                                                                    formData.find((item) => item.name === "balconies_wear")?.value || ""
                                                                }
                                                                type="number"
                                                                name="balconies_wear"
                                                                className="form-input"
                                                                onChange={handleInputChange}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </>

                                        )}

                                        {selectedSection === "Приборы учета" && (
                                            <>
                                                <div className="form-section">
                                                    <h2>Сведения об установленных общедомовых приборах учета</h2>
                                                    <div className="form-grid">
                                                        <div
                                                            className={`form-group ${missingFields.includes("resource_name") ? "error" : ""}`}
                                                        >
                                                            <label className="form-label" title="Наименование коммунального ресурса, для измерения объемов поставки которого используется общедомовой прибор учета">
                                                                Наименование коммунального ресурса, для измерения объемов поставки которого используется общедомовой прибор учета:
                                                            </label>
                                                            <select
                                                                value={
                                                                    formData.find((item) => item.name === "resource_name")?.value || ""
                                                                }
                                                                name="resource_name"
                                                                className="form-input"
                                                                onChange={handleInputChange}
                                                            >
                                                                <option value="" disabled>
                                                                    Выберите наименование коммунального ресурса...
                                                                </option>
                                                                <option value="ХВС">ХВС</option>
                                                                <option value="ГВС">ГВС</option>
                                                                <option value="Тепло">Тепло</option>
                                                                <option value="ГАЗ">ГАЗ</option>
                                                                <option value="Электро">Электро</option>
                                                            </select>
                                                        </div>
                                                        <div
                                                            className={`form-group ${missingFields.includes("meter_brand") ? "error" : ""}`}
                                                        >
                                                            <label className="form-label">
                                                                Марка прибора учета:
                                                            </label>
                                                            <input
                                                                value={
                                                                    formData.find((item) => item.name === "meter_brand")?.value || ""
                                                                }

                                                                name="meter_brand"
                                                                className="form-input"
                                                                onChange={handleInputChange}
                                                            />
                                                        </div>
                                                        <div
                                                            className={`form-group ${missingFields.includes("serial_number") ? "error" : ""}`}
                                                        >
                                                            <label className="form-label">
                                                                Заводской номер(серийный) :
                                                            </label>
                                                            <input
                                                                value={
                                                                    formData.find((item) => item.name === "serial_number")?.value || ""
                                                                }
                                                                type="number"
                                                                name="serial_number"
                                                                className="form-input"
                                                                onChange={handleInputChange}
                                                            />
                                                        </div>
                                                        <div
                                                            className={`form-group ${missingFields.includes("unit") ? "error" : ""}`}
                                                        >
                                                            <label className="form-label">
                                                                Единица измерения:
                                                            </label>
                                                            <input
                                                                value={
                                                                    formData.find((item) => item.name === "unit")?.value || ""
                                                                }
                                                                name="unit"
                                                                className="form-input"
                                                                onChange={handleInputChange}
                                                            />
                                                        </div>
                                                        <div
                                                            className={`form-group ${missingFields.includes("commissioning_date") ? "error" : ""}`}
                                                        >
                                                            <label className="form-label">
                                                                Дата ввода в эксплуатацию:
                                                            </label>
                                                            <input
                                                                value={
                                                                    formData.find((item) => item.name === "commissioning_date")?.value || ""
                                                                }
                                                                type="date"
                                                                name="commissioning_date"
                                                                className="form-input"
                                                                onChange={handleInputChange}
                                                            />
                                                        </div>
                                                        <div
                                                            className={`form-group ${missingFields.includes("meter_state") ? "error" : ""}`}
                                                        >
                                                            <label className="form-label">
                                                                Состояние:
                                                            </label>
                                                            <select
                                                                value={
                                                                    formData.find((item) => item.name === "meter_state")?.value || ""
                                                                }
                                                                name="meter_state"
                                                                className="form-input"
                                                                onChange={handleInputChange}
                                                            >
                                                                <option value="" disabled>
                                                                    Выберите состояние...
                                                                </option>
                                                                <option value="в работе">В работе</option>
                                                                <option value="в резерве">В резерве</option>
                                                                <option value="ремонт">Ремонт</option>
                                                            </select>
                                                        </div>
                                                        <div
                                                            className={`form-group ${missingFields.includes("verification_interval") ? "error" : ""}`}
                                                        >
                                                            <label className="form-label">
                                                                Межповерочный интервал:
                                                            </label>
                                                            <input
                                                                value={
                                                                    formData.find((item) => item.name === "verification_interval")?.value || ""
                                                                }
                                                                name="verification_interval"
                                                                className="form-input"
                                                                onChange={handleInputChange}
                                                            />
                                                        </div>
                                                        <div
                                                            className={`form-group ${missingFields.includes("planned_verification_date") ? "error" : ""}`}
                                                        >
                                                            <label className="form-label">
                                                                Плановая дата поверки:
                                                            </label>
                                                            <input
                                                                value={
                                                                    formData.find((item) => item.name === "planned_verification_date")?.value || ""
                                                                }
                                                                type="date"
                                                                name="planned_verification_date"
                                                                className="form-input"
                                                                onChange={handleInputChange}
                                                            />
                                                        </div>
                                                        <div
                                                            className={`form-group ${missingFields.includes("tariff_zone_type") ? "error" : ""}`}
                                                        >
                                                            <label className="form-label">
                                                                Вид прибора учета в зависимости от тарифных зон суток:
                                                            </label>
                                                            <input
                                                                value={
                                                                    formData.find((item) => item.name === "tariff_zone_type")?.value || ""
                                                                }
                                                                name="tariff_zone_type"
                                                                className="form-input"
                                                                onChange={handleInputChange}
                                                            />
                                                        </div>
                                                        <div
                                                            className={`form-group ${missingFields.includes("remote_reading_cold_water") ? "error" : ""}`}
                                                        >
                                                            <label className="form-label" title="Наличие возможности дистанционного снятия показаний прибора учета холодной воды">
                                                                Наличие возможности дистанционного снятия показаний прибора учета холодной воды:
                                                            </label>
                                                            <input
                                                                checked={
                                                                    formData.find((item) => item.name === "remote_reading_cold_water")?.value || false
                                                                }
                                                                type="checkbox"
                                                                name="remote_reading_cold_water"
                                                                className="form-checkbox"
                                                                onChange={(e) => handleInputChange({ target: { name: e.target.name, value: e.target.checked } })}
                                                            />
                                                        </div>
                                                        <div
                                                            className={`form-group ${missingFields.includes("remote_reading_hot_water") ? "error" : ""}`}
                                                        >
                                                            <label className="form-label" title="Наличие возможности дистанционного снятия показаний прибора учета горячей воды">
                                                                Наличие возможности дистанционного снятия показаний прибора учета горячей воды:
                                                            </label>
                                                            <input
                                                                checked={
                                                                    formData.find((item) => item.name === "remote_reading_hot_water")?.value || false
                                                                }
                                                                type="checkbox"
                                                                name="remote_reading_hot_water"
                                                                className="form-checkbox"
                                                                onChange={(e) => handleInputChange({ target: { name: e.target.name, value: e.target.checked } })}
                                                            />
                                                        </div>
                                                        <div
                                                            className={`form-group ${missingFields.includes("remote_reading_thermal_energy") ? "error" : ""}`}
                                                        >
                                                            <label className="form-label" title="Наличие возможности дистанционного снятия показаний прибора учета тепловой энергии">
                                                                Наличие возможности дистанционного снятия показаний прибора учета тепловой энергии:
                                                            </label>
                                                            <input
                                                                checked={
                                                                    formData.find((item) => item.name === "remote_reading_thermal_energy")?.value || false
                                                                }
                                                                type="checkbox"
                                                                name="remote_reading_thermal_energy"
                                                                className="form-checkbox"
                                                                onChange={(e) => handleInputChange({ target: { name: e.target.name, value: e.target.checked } })}
                                                            />
                                                        </div>
                                                        <div
                                                            className={`form-group ${missingFields.includes("remote_reading_gas") ? "error" : ""}`}
                                                        >
                                                            <label className="form-label" title="Наличие возможности дистанционного снятия показаний прибора учета газа">
                                                                Наличие возможности дистанционного снятия показаний прибора учета газа:
                                                            </label>
                                                            <input
                                                                checked={
                                                                    formData.find((item) => item.name === "remote_reading_gas")?.value || false
                                                                }
                                                                type="checkbox"
                                                                name="remote_reading_gas"
                                                                className="form-checkbox"
                                                                onChange={(e) => handleInputChange({ target: { name: e.target.name, value: e.target.checked } })}
                                                            />
                                                        </div>
                                                        <div
                                                            className={`form-group ${missingFields.includes("remote_reading_electricity") ? "error" : ""}`}
                                                        >
                                                            <label className="form-label" title="Наличие возможности дистанционного снятия показаний прибора учета электрической энергии">
                                                                Наличие возможности дистанционного снятия показаний прибора учета электрической энергии:
                                                            </label>
                                                            <input
                                                                checked={
                                                                    formData.find((item) => item.name === "remote_reading_electricity")?.value || false
                                                                }
                                                                type="checkbox"
                                                                name="remote_reading_electricity"
                                                                className="form-checkbox"
                                                                onChange={(e) => handleInputChange({ target: { name: e.target.name, value: e.target.checked } })}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </>

                                        )}

                                        <div className="form-buttons">
                                            <button
                                                className="form-button"
                                                onClick={handlePreviousSection}
                                                disabled={sections.indexOf(selectedSection) === 0}
                                            >
                                                Вернуться к предыдущему разделу
                                            </button>

                                            {sections.indexOf(selectedSection) === sections.length - 1 && (
                                                <button
                                                    className="form-button"
                                                    onClick={handleSave}
                                                >
                                                    Сохранить
                                                </button>
                                            )}

                                            <button
                                                className="form-button"
                                                onClick={handleNextSection}
                                                disabled={sections.indexOf(selectedSection) === sections.length - 1}
                                            >
                                                Перейти к следующему разделу
                                            </button>
                                        </div>
                                    </>
                                ) : (
                                    <p className="form-placeholder">Выберите адрес, чтобы продолжить.</p>
                                )}
                            </div>
                        </>
                    )}

                    {activeTab === "elevators" && (
                        <div className="container-elivators">
                            <div className="technical-passport-address-selector">
                                <label htmlFor="building-select" className="form-label">
                                    Выберите здание:
                                </label>
                                <select
                                    id="building-select"
                                    value={selectedBuilding}
                                    onChange={(e) => setSelectedBuilding(e.target.value)}
                                    className="form-input"
                                >
                                    <option value="" disabled>
                                        Выберите адрес
                                    </option>
                                    {buildingsList.map((building) => (
                                        <option key={building.id} value={building.id}>
                                            {building.address}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <Elevators addressId={selectedBuilding} />

                        </div>
                    )}

                    {activeTab === "viewPassport" && (
                        <>
                            <div className="container-elivators">
                                <div className="technical-passport-address-selector">
                                    <label htmlFor="building-select" className="form-label">
                                        Выберите здание:
                                    </label>
                                    <select
                                        id="building-select"
                                        value={selectedBuilding}
                                        onChange={(e) => {
                                            setSelectedBuilding(e.target.value);
                                            fetchBuildings(e.target.value);
                                        }}
                                        className="form-input"
                                    >
                                        <option value="" >
                                            Выберите адрес
                                        </option>
                                        {buildingsList.map((building) => (
                                            <option key={building.id} value={building.id}>
                                                {building.address}
                                            </option>
                                        ))}
                                    </select>

                                </div>
                                {fullInfoTechPass ? (
                                    <TableTechPass data={fullInfoTechPass} />
                                ) : (
                                    ''
                                )}
                            </div>
                            <div style={{ textAlign: "center" }}>
                                <button onClick={exportToExcel} className="export-button">
                                    Экспорт в Excel
                                </button>
                            </div>
                        </>
                    )}


                </div>
            )}
        </div>
    );
};

export default TechnicalPassportService;
