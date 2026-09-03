# Air-Gapped Local Deployment Guide

## Hardware Requirements
- **Standard Demo Mode**: Single Mid-Range Workstation (8-16 GB RAM, CPU only, uses built-in local engine fallback).
- **Full GPU Production Mode**: GPU Workstation or Server (NVIDIA RTX 4090 / A100 / H100 with Ollama or vLLM container).

## Steps
1. Clone / Copy repository to on-premise server.
2. Run `docker-compose up -d`.
3. Access UI at `http://localhost:3000`.
