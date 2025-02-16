import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { AgGridReact } from 'ag-grid-react';
import React, { useState, useMemo, useEffect, useRef } from 'react';
import { fetchWithToken } from '../apiClient';
import config from '../config';


const TableTechPass = ({ data }) => {

    const [rowData, setRowData] = useState();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [gridApi, setGridApi] = useState(null);
    const [selectedLifts, setSelectedLifts] = useState([]);

    useEffect(() => {
        if (!Array.isArray(data)) {
            setRowData([data]);
        } else {
            setRowData(data);
        }
    }, [data]);

    const columns = useMemo(() => [
        {
            headerName: 'Общие сведения',
            children: [
                {
                    headerName: 'Дата формирования электронного паспорта',
                    field: 'date_of_passport_generation',
                    editable: false,
                    width: 300,
                },
                {
                    headerName: 'Адрес здания',
                    field: 'address',
                    editable: false,
                    cellEditor: 'agLargeTextCellEditor',
                    width: 300,
                },
                {
                    headerName: 'Кадастровый номер',
                    field: 'cadastre_number',
                    editable: false,
                    cellEditor: 'agLargeTextCellEditor',
                    width: 300,
                },
                {
                    headerName: 'Назначение здания',
                    field: 'purpose_of_building',
                    editable: false,
                    cellEditor: 'agLargeTextCellEditor',
                    width: 300,
                },
                {
                    headerName: 'Год ввода в эксплуатацию',
                    field: 'year_operation',
                    editable: false,
                    cellEditor: 'agLargeTextCellEditor',
                    width: 300,
                },
                {
                    headerName: 'Год постройки',
                    field: 'year_construction',
                    editable: false,
                    cellEditor: 'agLargeTextCellEditor',
                    width: 300,
                },
                {
                    headerName: 'Стадия жизненного цикла',
                    field: 'life_cycle_stage',
                    editable: false,
                    cellEditor: 'agLargeTextCellEditor',
                    width: 300,
                },
                {
                    headerName: 'Год проведения реконструкции',
                    field: 'year_reconstruction',
                    editable: false,
                    cellEditor: 'agLargeTextCellEditor',
                    width: 300,
                },
                {
                    headerName: 'Количество этажей',
                    field: 'floorCount',
                    editable: false,
                    cellEditor: 'agLargeTextCellEditor',
                    width: 300,
                },
                {
                    headerName: 'Количество подземных этажей',
                    field: 'underground_floor_count',
                    editable: false,
                    cellEditor: 'agLargeTextCellEditor',
                    width: 300,
                },
                {
                    headerName: 'Количество подъездов',
                    field: 'number_entrances',
                    editable: false,
                    cellEditor: 'agLargeTextCellEditor',
                    width: 300,
                },
                {
                    headerName: 'Количество лифтов',
                    field: 'number_elevators',
                    editable: false,
                    cellEditor: 'agLargeTextCellEditor',
                    width: 300,
                },
                {
                    headerName: 'Количество рабочих помещений',
                    field: 'number_working_rooms',
                    editable: false,
                    cellEditor: 'agLargeTextCellEditor',
                    width: 300,
                },
                {
                    headerName: 'Количество вспомогательных помещений',
                    field: 'number_auxiliary_rooms',
                    editable: false,
                    cellEditor: 'agLargeTextCellEditor',
                    width: 300,
                },
                {
                    headerName: 'Общая площадь рабочих помещений',
                    field: 'total_area_working_premises',
                    editable: false,
                    cellEditor: 'agLargeTextCellEditor',
                    width: 300,
                },
                {
                    headerName: 'Общая площадь вспомогательных помещений, за исключением помещений общего пользования, кв.м',
                    field: 'total_area_auxiliary_premises_except_common_areas',
                    editable: false,
                    cellEditor: 'agLargeTextCellEditor',
                    width: 300,
                },
                {
                    headerName: 'Общая площадь помещений общего пользования в здании, кв.м',
                    field: 'total_area_common_areas_building',
                    editable: false,
                    cellEditor: 'agLargeTextCellEditor',
                    width: 300,
                },
                {
                    headerName: 'Количество балконов',
                    field: 'balcony_count',
                    editable: false,
                    cellEditor: 'agLargeTextCellEditor',
                    width: 300,
                },
                {
                    headerName: 'Количество лоджий',
                    field: 'lodji_count',
                    editable: false,
                    cellEditor: 'agLargeTextCellEditor',
                    width: 300,
                },
            ],
        },
        {
            headerName: 'Конструктив',
            children: [
                {
                    headerName: 'Фундамент',
                    children: [
                        {
                            headerName: 'Тип фундамента',
                            field: 'foundation_type',
                            editable: false,
                            width: 200,
                        },
                        {
                            headerName: 'Материал фундамента',
                            field: 'foundation_material',
                            editable: false,
                            width: 200,
                        },
                        {
                            headerName: 'Площадь отмостки, КВ.м',
                            field: 'paving_area',
                            editable: false,
                            width: 200,
                        },
                        {
                            headerName: 'Физический износ, %',
                            field: 'foundation_wear',
                            editable: false,
                            width: 200,
                        },
                        {
                            headerName: 'Год проведения последнего капитального ремонта',
                            field: 'foundation_last_repair_year',
                            editable: false,
                            width: 200,
                        },
                    ],
                },
                {
                    headerName: 'Внутренние стены',
                    children: [
                        {
                            headerName: 'Тип внутренних стен',
                            field: 'internal_walls_type',
                            editable: false,
                            width: 200,
                        },
                        {
                            headerName: 'Материал внутренних стен',
                            field: 'internal_walls_material',
                            editable: false,
                            width: 200,
                        },
                        {
                            headerName: 'Физический износ, %',
                            field: 'internal_walls_wear',
                            editable: false,
                            width: 200,
                        },
                    ],
                },
                {
                    headerName: 'Фасад',
                    children: [
                        {
                            headerName: 'Тип наружных стен',
                            field: 'external_walls_type',
                            editable: false,
                            width: 200,
                        },
                        {
                            headerName: 'Материал наружных стен',
                            field: 'external_walls_material',
                            editable: false,
                            width: 200,
                        },
                        {
                            headerName: 'Тип наружного утепления фасада',
                            field: 'facade_insulation_type',
                            editable: false,
                            width: 200,
                        },
                        {
                            headerName: 'Материал отделки фасада',
                            field: 'facade_cladding_material',
                            editable: false,
                            width: 200,
                        },
                        {
                            headerName: 'Физический износ, наружных стен, %',
                            field: 'external_walls_wear',
                            editable: false,
                            width: 200,
                        },
                        {
                            headerName: 'Год проведения последнего капитального ремонта',
                            field: 'facade_last_repair_year',
                            editable: false,
                            width: 200,
                        },
                    ],
                },
                {
                    headerName: 'Перекрытия',
                    children: [
                        {
                            headerName: 'Тип перекрытий',
                            field: 'floor_type',
                            editable: false,
                            width: 200,
                        },
                        {
                            headerName: 'Конструкция перекрытий',
                            field: 'floor_structure',
                            editable: false,
                            width: 200,
                        },
                        {
                            headerName: 'Физический износ, %',
                            field: 'floor_wear',
                            editable: false,
                            width: 200,
                        },
                    ],
                },
                {
                    headerName: 'Крыша',
                    children: [
                        {
                            headerName: 'Форма крыши',
                            field: 'roof_shape',
                            editable: false,
                            width: 200,
                        },
                        {
                            headerName: 'Вид несущей части',
                            field: 'roof_structure_type',
                            editable: false,
                            width: 200,
                        },
                        {
                            headerName: 'Физический износ, %',
                            field: 'roof_structure_wear',
                            editable: false,
                            width: 200,
                        },
                        {
                            headerName: 'Год проведения последнего капитального ремонта',
                            field: 'roof_last_repair_year',
                            editable: false,
                            width: 200,
                        },
                        {
                            headerName: 'Утепляющие слои чердачных перекрытий',
                            field: 'attic_insulation',
                            editable: false,
                            width: 200,
                        },
                    ],
                },
                {
                    headerName: 'Кровля',
                    children: [
                        {
                            headerName: 'Тип кровли',
                            field: 'roof_cover_type',
                            editable: false,
                            width: 200,
                        },
                        {
                            headerName: 'Физический износ, %',
                            field: 'roof_cover_wear',
                            editable: false,
                            width: 200,
                        },
                        {
                            headerName: 'Год проведения последнего капитального ремонта',
                            field: 'roof_cover_last_repair_year',
                            editable: false,
                            width: 200,
                        },
                    ],
                },
                {
                    headerName: 'Окна',
                    children: [
                        {
                            headerName: 'Физический износ, %',
                            field: 'windows_wear',
                            editable: false,
                            width: 200,
                        },
                        {
                            headerName: 'Материал окон',
                            field: 'windows_material',
                            editable: false,
                            width: 200,
                        },
                    ],
                },
                {
                    headerName: 'Двери',
                    children: [
                        {
                            headerName: 'Физический износ, %',
                            field: 'doors_wear',
                            editable: false,
                            width: 200,
                        },
                    ],
                },
                {
                    headerName: 'Отделочные покрытия помещений общего пользования',
                    children: [
                        {
                            headerName: 'Физический износ, %',
                            field: 'common_area_wear',
                            editable: false,
                            width: 200,
                        },
                    ],
                },
                {
                    headerName: 'Другие конструктивные элементы общественного здания',
                    children: [
                        {
                            headerName: 'Наименование конструктивного элемента',
                            field: 'element_name',
                            editable: false,
                            width: 200,
                        },
                        {
                            headerName: 'Физический износ, %',
                            field: 'element_wear',
                            editable: false,
                            width: 200,
                        },
                        {
                            headerName: 'Год проведения последнего капитального ремонта',
                            field: 'element_last_repair_year',
                            editable: false,
                            width: 200,
                        },
                    ],
                },
            ],
        },
        {
            headerName: 'Инженерные сети',
            children: [
                {
                    headerName: 'Внутридомовая система отопления',
                    children: [
                        {
                            headerName: 'Физический износ, %',
                            field: 'heating_wear',
                            editable: false,
                            width: 200,
                        },
                        {
                            headerName: 'Год проведения последнего капитального ремонта',
                            field: 'heating_last_repair_year',
                            editable: false,
                            width: 200,
                        },
                        {
                            headerName: 'Тип внутридомовой системы отопления',
                            field: 'heating_system_type',
                            editable: false,
                            width: 200,
                        },
                        {
                            headerName: 'Тип теплоисточника или теплоносителя внутридомовой системы отопления',
                            field: 'heat_source_type',
                            editable: false,
                            width: 200,
                        },
                        {
                            headerName: 'Количество вводов системы отопления в здание (количество точек поставки)',
                            field: 'heating_inlets_count',
                            editable: false,
                            width: 200,
                        },
                    ],
                },
                {
                    headerName: 'Сеть внутридомовой системы отопления',
                    children: [
                        {
                            headerName: 'Физический износ, %',
                            field: 'network_wear',
                            editable: false,
                            width: 200,
                        },
                        {
                            headerName: 'Материал сети',
                            field: 'network_material',
                            editable: false,
                            width: 200,
                        },
                        {
                            headerName: 'Материал теплоизоляции сети',
                            field: 'network_insulation_material',
                            editable: false,
                            width: 200,
                        },
                    ],
                },
                {
                    headerName: 'Стояки',
                    children: [
                        {
                            headerName: 'Физический износ, %',
                            field: 'risers_wear',
                            editable: false,
                            width: 200,
                        },
                    ],
                },
                {
                    headerName: 'Запорная арматура',
                    children: [
                        {
                            headerName: 'Физический износ, %',
                            field: 'valves_wear',
                            editable: false,
                            width: 200,
                        },
                    ],
                },
                {
                    headerName: 'Отопительные приборы',
                    children: [
                        {
                            headerName: 'Физический износ, %',
                            field: 'radiators_wear',
                            editable: false,
                            width: 200,
                        },
                        {
                            headerName: 'Тип отопительных приборов',
                            field: 'radiators_type',
                            editable: false,
                            width: 200,
                        },
                    ],
                },
                {
                    headerName: 'Печи, камины и очаги',
                    children: [
                        {
                            headerName: 'Физический износ, %',
                            field: 'stoves_wear',
                            editable: false,
                            width: 200,
                        },
                        {
                            headerName: 'Год проведения последнего капитального ремонта',
                            field: 'stoves_last_repair_year',
                            editable: false,
                            width: 200,
                        },
                    ],
                },
                {
                    headerName: 'Внутридомовая инженерная система холодного водоснабжения',
                    children: [
                        {
                            headerName: 'Физический износ, %',
                            field: 'cold_water_wear',
                            editable: false,
                            width: 200,
                        },
                        {
                            headerName: 'Год проведения последнего капитального ремонта',
                            field: 'cold_water_last_repair_year',
                            editable: false,
                            width: 200,
                        },
                        {
                            headerName: 'Тип внутридомовой инженерной системы холодного водоснабжения',
                            field: 'cold_water_system_type',
                            editable: false,
                            width: 200,
                        },
                        {
                            headerName: 'Количество вводов внутридомовой инженерной системы холодного водоснабжения в здание (количество точек поставки)',
                            field: 'cold_water_inlets_count',
                            editable: false,
                            width: 200,
                        },
                    ],
                },
                {
                    headerName: 'Сеть внутридомовой инженерной системы холодного водоснабжения',
                    children: [
                        {
                            headerName: 'Физический износ, %',
                            field: 'cold_water_network_wear',
                            editable: false,
                            width: 200,
                        },
                        {
                            headerName: 'Материал сети',
                            field: 'cold_water_network_material',
                            editable: false,
                            width: 200,
                        },
                    ],
                },
                {
                    headerName: 'Стояки',
                    children: [
                        {
                            headerName: 'Физический износ, %',
                            field: 'only_cold_water_risers_wear',
                            editable: false,
                            width: 200,
                        },
                        {
                            headerName: 'Материал',
                            field: 'only_cold_water_risers_material',
                            editable: false,
                            width: 200,
                        },
                    ],
                },
                {
                    headerName: 'Запорная арматура',
                    children: [
                        {
                            headerName: 'Физический износ, %',
                            field: 'only_cold_water_valves_wear',
                            editable: false,
                            width: 200,
                        },
                    ],
                },
                {
                    headerName: 'Внутридомовая инженерная система горячего водоснабжения',
                    children: [
                        {
                            headerName: 'Физический износ, %',
                            field: 'hot_water_wear',
                            editable: false,
                            width: 200,
                        },
                        {
                            headerName: 'Год проведения последнего капитального ремонта',
                            field: 'hot_water_last_repair_year',
                            editable: false,
                            width: 200,
                        },
                        {
                            headerName: 'Тип внутридомовой инженерной системы горячего водоснабжения',
                            field: 'hot_water_system_type',
                            editable: false,
                            width: 200,
                        },
                        {
                            headerName: 'Количество вводов внутридомовой инженерной системы горячего водоснабжения в здание (количество точек поставки)',
                            field: 'hot_water_inlets_count',
                            editable: false,
                            width: 200,
                        },
                    ],
                },
                {
                    headerName: 'Сеть внутридомовой инженерной системы горячего водоснабжения',
                    children: [
                        {
                            headerName: 'Физический износ, %',
                            field: 'hot_water_network_wear',
                            editable: false,
                            width: 200,
                        },
                        {
                            headerName: 'Материал сети',
                            field: 'only_hot_water_network_material',
                            editable: false,
                            width: 200,
                        },
                        {
                            headerName: 'Материал теплоизоляции сети',
                            field: 'only_hot_water_network_network_insulation_material',
                            editable: false,
                            width: 200,
                        },
                    ],
                },
                {
                    headerName: 'Стояки',
                    children: [
                        {
                            headerName: 'Физический износ, %',
                            field: 'only_hot_water_risers_wear',
                            editable: false,
                            width: 200,
                        },
                        {
                            headerName: 'Материал',
                            field: 'only_hot_water_risers_material',
                            editable: false,
                            width: 200,
                        },
                    ],
                },
                {
                    headerName: 'Запорная арматура',
                    children: [
                        {
                            headerName: 'Физический износ, %',
                            field: 'only_hot_water_valves_wear',
                            editable: false,
                            width: 200,
                        },
                    ],
                },
                {
                    headerName: 'Внутридомовая инженерная система водоотведения',
                    children: [
                        {
                            headerName: 'Физический износ, %',
                            field: 'wastewater_wear',
                            editable: false,
                            width: 200,
                        },
                        {
                            headerName: 'Год проведения последнего капитального ремонта',
                            field: 'wastewater_last_repair_year',
                            editable: false,
                            width: 200,
                        },
                        {
                            headerName: 'Тип внутридомовой инженерной системы водоотведения',
                            field: 'wastewater_system_type',
                            editable: false,
                            width: 200,
                        },
                        {
                            headerName: 'Материал сети',
                            field: 'wastewater_system_material',
                            editable: false,
                            width: 200,
                        },
                    ],
                },
                {
                    headerName: 'Внутридомовая инженерная система газоснабжения',
                    children: [
                        {
                            headerName: 'Год проведения последнего капитального ремонта',
                            field: 'gas_last_repair_year',
                            editable: false,
                            width: 200,
                        },
                        {
                            headerName: 'Тип внутридомовой инженерной системы газоснабжения',
                            field: 'gas_system_type',
                            editable: false,
                            width: 200,
                        },
                        {
                            headerName: 'Количество вводов внутридомовой инженерной системы газоснабжения в здание',
                            field: 'gas_inlets_count',
                            editable: false,
                            width: 200,
                        },
                    ],
                },
                {
                    headerName: 'Внутридомовая инженерная система электроснабжения',
                    children: [
                        {
                            headerName: 'Физический износ, %',
                            field: 'electricity_wear',
                            editable: false,
                            width: 200,
                        },
                        {
                            headerName: 'Год проведения последнего капитального ремонта',
                            field: 'electricity_last_repair_year',
                            editable: false,
                            width: 200,
                        },
                        {
                            headerName: 'Количество вводов внутридомовой инженерной системы электроснабжения в здание',
                            field: 'electricity_inlets_count',
                            editable: false,
                            width: 200,
                        },
                    ],
                },
                {
                    headerName: 'Балконы, лоджии, козырьки и эркеры',
                    children: [
                        {
                            headerName: 'Физический износ, %',
                            field: 'balconies_wear',
                            editable: false,
                            width: 200,
                        },
                    ],
                },
            ],
        },
        {
            headerName: 'Приборы учета',
            children: [
                {
                    headerName: 'Наименование коммунального ресурса, для измерения объемов поставки которого используется общедомовой прибор учета',
                    field: 'resource_name',
                    editable: false,
                    width: 300,
                },
                {
                    headerName: 'Марка прибора учета',
                    field: 'meter_brand',
                    editable: false,
                    cellEditor: 'agLargeTextCellEditor',
                    width: 300,
                },
                {
                    headerName: 'Заводской номер (серийный)',
                    field: 'serial_number',
                    editable: false,
                    cellEditor: 'agLargeTextCellEditor',
                    width: 300,
                },
                {
                    headerName: 'Единица измерения',
                    field: 'unit',
                    editable: false,
                    cellEditor: 'agLargeTextCellEditor',
                    width: 300,
                },
                {
                    headerName: 'Дата ввода в эксплуатацию',
                    field: 'commissioning_date',
                    editable: false,
                    cellEditor: 'agLargeTextCellEditor',
                    width: 300,
                },
                {
                    headerName: 'Состояние',
                    field: 'meter_state',
                    editable: false,
                    cellEditor: 'agLargeTextCellEditor',
                    width: 300,
                },
                {
                    headerName: 'Межповерочный интервал',
                    field: 'verification_interval',
                    editable: false,
                    cellEditor: 'agLargeTextCellEditor',
                    width: 300,
                },
                {
                    headerName: 'Плановая дата поверки',
                    field: 'planned_verification_date',
                    editable: false,
                    cellEditor: 'agLargeTextCellEditor',
                    width: 300,
                },
                {
                    headerName: 'Количество этажей',
                    field: 'floorCount',
                    editable: false,
                    cellEditor: 'agLargeTextCellEditor',
                    width: 300,
                },
                {
                    headerName: 'Вид прибора учета в зависимости от тарифных зон суток',
                    field: 'tariff_zone_type',
                    editable: false,
                    cellEditor: 'agLargeTextCellEditor',
                    width: 300,
                },
                {
                    headerName: 'Наличие возможности дистанционного снятия показаний прибора учета холодной воды',
                    field: 'remote_reading_cold_water',
                    editable: false,
                    cellEditor: 'agLargeTextCellEditor',
                    width: 300,
                },
                {
                    headerName: 'Наличие возможности дистанционного снятия показаний прибора учета горячей воды',
                    field: 'remote_reading_hot_water',
                    editable: false,
                    cellEditor: 'agLargeTextCellEditor',
                    width: 300,
                },
                {
                    headerName: 'Наличие возможности дистанционного снятия показаний прибора учета тепловой энергии',
                    field: 'remote_reading_thermal_energy',
                    editable: false,
                    cellEditor: 'agLargeTextCellEditor',
                    width: 300,
                },
                {
                    headerName: 'Наличие возможности дистанционного снятия показаний прибора учета газа',
                    field: 'remote_reading_gas',
                    editable: false,
                    cellEditor: 'agLargeTextCellEditor',
                    width: 300,
                },
                {
                    headerName: 'Наличие возможности дистанционного снятия показаний прибора учета электрической энергии',
                    field: 'remote_reading_electricity',
                    editable: false,
                    cellEditor: 'agLargeTextCellEditor',
                    width: 300,
                },
            ],
        },
    ],);

    const liftsColumnDefs = [
        { headerName: '№ Подъезда', field: 'entrance_number', width: 150 },
        { headerName: 'Тип лифта', field: 'lift_type', width: 150 },
        { headerName: 'Заводской номер', field: 'factory_number', width: 200 },
        { headerName: 'Инвентарный номер', field: 'inventory_number', width: 200 },
        { headerName: 'Грузоподъемность', field: 'load_capacity', width: 150 },
        { headerName: 'Год ввода', field: 'commissioning_year', width: 150 },
        { headerName: 'Нормативный срок службы', field: 'normative_lifetime', width: 200 },
        { headerName: 'Износ (%)', field: 'physical_wear', width: 150 },
        { headerName: 'Год последнего ремонта', field: 'last_major_repair_year', width: 200 },
    ];

    const onRowClicked = (rowData) => {
        setSelectedLifts(rowData.lifts || []);
        setIsModalOpen(true);
    }

    return (
        <>
            <div
                className="ag-theme-alpine"
                style={{
                    height: '28vh',
                    width: '90%',
                    margin: '50px auto',
                    overflowX: 'auto',
                    padding: '0 20px',
                }}
            >
                <AgGridReact
                    rowData={rowData}
                    columnDefs={columns}
                    rowHeight={130}
                    onRowClicked={(params) => onRowClicked(params.data)}
                    onGridReady={(params) => setGridApi(params.api)}
                    defaultColDef={{
                        filter: true,
                        resizable: true,
                        editable: true,
                    }}
                />
            </div>
            {isModalOpen && (
                <div
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        backgroundColor: 'rgba(0,0,0,0.5)',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        zIndex: 1000, 
                    }}
                >
                    <div
                        style={{
                            backgroundColor: 'white',
                            padding: '20px',
                            borderRadius: '10px',
                            width: '70%',
                            height: '60%',
                            boxShadow: '0 4px 10px rgba(0, 0, 0, 0.3)',
                            overflow: 'hidden',
                            zIndex: 1001,
                        }}
                    >
                        <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Данные по лифтам</h2>
                        <div
                            className="ag-theme-alpine"
                            style={{ height: '80%', width: '100%' }}
                        >
                            <AgGridReact
                                rowData={selectedLifts}
                                columnDefs={liftsColumnDefs}
                                defaultColDef={{ resizable: true }}
                            />
                        </div>
                        <button
                            style={{
                                marginTop: '10px',
                                marginBottom: '10px',
                                padding: '10px 20px',
                                backgroundColor: '#007bff',
                                color: 'white',
                                border: 'none',
                                borderRadius: '5px',
                                cursor: 'pointer',
                                display: 'block',
                                marginLeft: 'auto',
                                marginRight: 'auto',
                            }}
                            onClick={() => setIsModalOpen(false)}
                        >
                            Закрыть
                        </button>
                    </div>
                </div>
            )}
        </>
    );

}
export default TableTechPass;