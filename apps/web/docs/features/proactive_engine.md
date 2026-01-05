# Module 2: Proactive Wellbeing Engine

This module is the core differentiator of the Helix platform. It is an agentic engine designed to operate on two fundamental principles: "Know When" to act and "Know How" to assist. This engine directly addresses the primary failure of traditional wellness apps—which rely on user motivation alone—by providing timely, intelligent interventions without requiring explicit user commands.

## Architecture: AI for Service Framework

* **Data Ingestion & Tracking**: Continuous analysis of user-provided data from integrated sources (calendars, wearables, wellness journals) and behavioral metrics (clicks, session frequency).
* **Trigger & Analysis Models**: A lightweight "trigger model" scans for critical events (e.g., calendar deadlines, poor sleep). A "streaming model" performs detailed context analysis when triggered.
* **Reasoning & Synthesis**: An orchestrator LLM synthesizes multiple inputs, integrating long-term goals and real-time context to generate recommendations.
* **Proactive Nudging**: Delivery of timely reminders designed to close the "intention-behavior gap."

## Proactive Protocols (FitnessOS)

1. **Protein Protocol**: Real-time monitoring of protein intake with afternoon "nudges" for high-quality sources or supplements.
2. **Calorie Protocol**: A skill acquisition phase promoting kitchen scale usage for intuitive eating skills.
3. **Training Protocol**: Prioritizing compound movements and implementing Progressive Overload suggestions.
4. **Health Optimization**: Suggestions like "15-minute walks" after dinner to aid digestion and meet cardio goals.

## Churn Prediction

Supervised learning models identify behavioral patterns of previous churners, triggering proactive interventions like targeted feature walk-throughs to re-engage the user.
