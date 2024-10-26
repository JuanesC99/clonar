"use client";
import React, { useState, useEffect } from "react";
import {
    Slider,
    MenuItem,
    Select,
    InputLabel,
    FormControl,
    Switch,
    FormControlLabel,
    TextField,
} from "@mui/material";
import Link from "next/link";

// Data for project types and their budget ranges
const projectTypes = {
    landing: { name: "Landing", minBudget: 800, maxBudget: 3000, basePrice: 1200, defaultDuration: 2 },
    corporate: { name: "Sitio corporativo", minBudget: 2500, maxBudget: 8000, basePrice: 4000, defaultDuration: 3 },
    saas: { name: "Aplicación SAAS", minBudget: 4000, maxBudget: 12000, basePrice: 6000, defaultDuration: 4 },
    ecommerce: { name: "Tienda en línea", minBudget: 3000, maxBudget: 10000, basePrice: 5000, defaultDuration: 2 },
};

// Data for functionalities
const functionalities = [
    { name: "Básica", multiplier: 1, supportCost: 100 },
    { name: "Media", multiplier: 1.5, supportCost: 200 },
    { name: "Avanzada", multiplier: 2, supportCost: 300 },
];

const CalculatorSection = () => {
    const [projectType, setProjectType] = useState("landing");
    const [minBudget, setMinBudget] = useState(projectTypes["landing"].minBudget);
    const [maxBudget, setMaxBudget] = useState(projectTypes["landing"].maxBudget);
    const [selectedMaxBudget, setSelectedMaxBudget] = useState(projectTypes["landing"].maxBudget);
    const [functionality, setFunctionality] = useState("Básica");
    const [support, setSupport] = useState(false);
    const [calculatedPrice, setCalculatedPrice] = useState(0);
    const [supportCost, setSupportCost] = useState(0);
    const [duration, setDuration] = useState(projectTypes["landing"].defaultDuration);

    const basePrice = projectTypes[projectType].basePrice;
    const functionalityMultiplier = functionalities.find(func => func.name === functionality).multiplier;
    const finalPrice = basePrice * functionalityMultiplier;

    // Update max and min budget based on selected project type
    useEffect(() => {
        const newMaxBudget = projectTypes[projectType].maxBudget;
        setMaxBudget(newMaxBudget);
        setSelectedMaxBudget(newMaxBudget);
        setMinBudget(projectTypes[projectType].minBudget);
        setDuration(projectTypes[projectType].defaultDuration);
    }, [functionality, projectType]);

    // Determine budget limits and set slider color based on budget status
    const isWithinBudget = finalPrice >= minBudget && finalPrice <= selectedMaxBudget;
    const recommendedBudget = finalPrice;
    const lowBudgetThreshold = calculatedPrice.toFixed(2) * 0.57;

    let sliderColor = 'red';
    if (selectedMaxBudget >= calculatedPrice.toFixed(2)) {
        sliderColor = 'green';
    } else if (selectedMaxBudget < calculatedPrice.toFixed(2) && selectedMaxBudget > lowBudgetThreshold) {
        sliderColor = 'orange';
    }

    useEffect(() => {
        let additionalPrice = 0;
        if (duration < projectTypes[projectType].defaultDuration) {
            additionalPrice = (recommendedBudget * 0.2) * (projectTypes[projectType].defaultDuration - duration);
        }
        const totalPrice = finalPrice + additionalPrice;
        setCalculatedPrice(totalPrice);

        const supportCostPerMonth = functionalities.find(func => func.name === functionality).supportCost;
        setSupportCost(supportCostPerMonth);
    }, [finalPrice, functionality, duration]);

    // Handle project type selection change
    const handleProjectTypeChange = (event) => {
        const newProjectType = event.target.value;
        setProjectType(newProjectType);
        const newMaxBudget = projectTypes[newProjectType].maxBudget;
        setMaxBudget(newMaxBudget);
        setSelectedMaxBudget(newMaxBudget);
        setMinBudget(projectTypes[newProjectType].minBudget);
        setDuration(projectTypes[newProjectType].defaultDuration);
    };

    const isBelowRecommendedDuration = duration < projectTypes[projectType].defaultDuration;

    // Function to handle button click
    const handleButtonClick = () => {
        const data = {
            projectType: projectTypes[projectType].name,
            budget: {
                min: minBudget,
                max: selectedMaxBudget,
            },
            functionality: {
                name: functionality,
                multiplier: functionalityMultiplier,
            },
            support: {
                active: support,
                cost: supportCost,
            },
            duration,
            finalPrice: calculatedPrice,
        };
        console.log(data); // Log the consolidated data object to the console
    };

    return (
        <section className="mil-soft-bg mil-relative">
            <img src="/img/other/bg.svg" className="mil-bg-img" alt="Background illustration" />
            <div className="container mil-p-120-90">
                <div className="mil-background-grid mil-softened" />
                <div className="row justify-content-between">
                    <div className="col-lg-4">
                        <div className="mil-mb-60">
                            <span className="mil-suptitle mil-upper mil-up mil-mb-30">Calculadora de Costos de Proyecto</span>
                            <h2 className="mil-upper mil-up mil-mb-30">Calcula el costo de tu proyecto</h2>
                            <p className="mil-up">Elige los parámetros de tu proyecto y obtén un cálculo preliminar.</p>
                        </div>
                    </div>
                    <div className="col-lg-7">
                        <form className="mil-mt-suptitle-offset mil-mb-30">
                            <div className="row">
                                <div className="col-lg-6">
                                    <FormControl style={{marginBottom: '20px'}} fullWidth margin="0" className="mil-dark-input mil-up mil-mb-30">
                                        <InputLabel id="project-type-label">Tipo de proyecto</InputLabel>
                                        <Select
                                            label='Tipo de proyecto'
                                            labelId="project-type-label"
                                            id="project-type"
                                            value={projectType}
                                            onChange={handleProjectTypeChange}
                                            fullWidth
                                        >
                                            {Object.keys(projectTypes).map((type) => (
                                                <MenuItem key={type} value={type}>
                                                    {projectTypes[type].name}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>

                                    <FormControl style={{ marginBottom: '20px'}} fullWidth margin="0" className="mil-dark-input mil-up mil-mb-30">
                                        <InputLabel id="functionality-label">Funcionalidad</InputLabel>
                                        <Select
                                            label='Funcionalidad'
                                            labelId="functionality-label"
                                            id="functionality"
                                            value={functionality}
                                            onChange={(e) => setFunctionality(e.target.value)}
                                            fullWidth
                                        >
                                            {functionalities.map((func) => (
                                                <MenuItem key={func.name} value={func.name}>
                                                    {func.name}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>

                                    <TextField
                                        fullWidth
                                        label="Plazos (en semanas)"
                                        type="number"
                                        value={duration}
                                        onChange={(e) => {
                                            const newDuration = Math.max(1, Number(e.target.value));
                                            setDuration(newDuration);
                                        }}
                                        className="mil-dark-input"
                                        inputProps={{
                                            min: 1,
                                        }}
                                    />
                                </div>
                                <div className="col-lg-6">
                                    <div className="mil-input-frame mil-dark-input mil-up mil-mb-30">
                                        <label className="mil-upper">
                                            <span>Presupuesto</span>
                                        </label>
                                        <Slider
                                            value={[minBudget, selectedMaxBudget]}
                                            min={projectTypes[projectType].minBudget}
                                            max={maxBudget}
                                            step={100}
                                            onChange={(event, newValue) => {
                                                setMinBudget(newValue[0]);
                                                setSelectedMaxBudget(newValue[1]);
                                            }}
                                            valueLabelDisplay="auto"
                                            aria-labelledby="budget-slider"
                                            className="mil-slider"
                                            sx={{
                                                color: sliderColor,
                                            }}
                                        />
                                        <p>Mínimo: {minBudget} € | Máximo: {selectedMaxBudget} €</p>
                                    </div>
                                    <p>¡3 meses de soporte y mejoras sin costo, tras el lanzamiento!</p>
                                    <FormControlLabel
                                        control={
                                            <Switch
                                                checked={support}
                                                onChange={(e) => setSupport(e.target.checked)}
                                                color="primary"
                                            />
                                        }
                                        label="Mantener después del periodo gratuito."
                                    />
                                </div>
                            </div>
                            <div className="mil-up mil-mb-30">
                                <div className="mil-upper mil-dark">Precio final</div>
                                <h4 className="mil-upper" style={{ color: isBelowRecommendedDuration ? 'red' : 'black' }}>
                                    € {calculatedPrice.toFixed(2)} &nbsp;
                                    <span className="mil-text-sm mil-thin mil-dark-soft">/ Sin IVA</span>
                                    {support && (
                                        <>
                                            &nbsp;+ € {supportCost} &nbsp;
                                            <span className="mil-text-sm mil-thin mil-dark-soft">/ al mes</span>
                                        </>
                                    )}
                                </h4>
                                {isBelowRecommendedDuration && (
                                    <p style={{ color: 'red' }}>
                                        ¡Más apretados que sardina en su lata!
                                    </p>
                                )}
                            </div>
                        </form>
                        <div className="mil-up">
                            <div className="mil-divider-lg mil-mb-60"></div>
                        </div>
                        <div className="row align-items-end">
                            <div className="col-lg-6">
                                <div className="mil-up mil-mb-30">
                                    <div className="mil-upper mil-dark mil-mb-10">Envíe sus ideas</div>
                                    <h4 className="mil-upper">Obtenga un presupuesto completo</h4>
                                </div>
                            </div>
                            <div className="col-lg-6 mil-mb-30">
                                <div className="mil-adaptive-right mil-up">
                                    <Link href="/contact" className="mil-button" onClick={handleButtonClick}>
                                        Obtener presupuesto
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CalculatorSection;
