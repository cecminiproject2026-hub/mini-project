export const PRESET_PROJECTS = [
  {
    id: 'waste-segregation',
    title: 'AI-Powered Waste Segregation System',
    description: 'A computer-vision system that detects, classifies, and segregates different types of recyclable and organic waste in real time on a conveyor belt using edge AI.',
    domain: 'Computer Vision',
    technologies: ['Python', 'OpenCV', 'YOLOv8', 'PyTorch', 'Raspberry Pi'],
    project_level: 'Major Project',
    sampleAnalysis: {
      papers: [
        {
          title: 'Automated Waste Sorting Using Deep Convolutional Neural Networks and Edge Computing',
          similarity_score: 88.5,
          year: 2023,
          source: 'Semantic Scholar',
          authors: ['Chen, L.', 'Patel, R.', 'Kumar, S.'],
          abstract: 'We present an edge-compatible deep learning framework for real-time recyclable waste sorting. The model achieves 94.2% accuracy on benchmark datasets, though performance drops significantly under low-light industrial lighting and dirty conveyor conditions.',
          url: 'https://semanticscholar.org/paper/example-waste-1',
          methodology: 'YOLOv7 fine-tuned on custom industrial dataset',
          dataset: 'TrashNet & Custom Factory (12,000 images)',
          limitations: 'Degraded accuracy in non-uniform lighting; high latency on microcontrollers.'
        },
        {
          title: 'Multi-Class Municipal Solid Waste Detection via Lightweight Transformer Architectures',
          similarity_score: 79.2,
          year: 2024,
          source: 'OpenAlex',
          authors: ['Alvarez, M.', 'Zhang, H.', 'Morales, E.'],
          abstract: 'Investigates vision transformers for multi-stream municipal waste classification. Highlights trade-offs between parameter efficiency and inference throughput on edge-grade NVIDIA Jetson Nano platforms with limited dataset diversity.',
          url: 'https://openalex.org/Wexample-waste-2',
          methodology: 'MobileViT with depthwise separable convolutions',
          dataset: 'TACO Dataset + Urban Bin Dataset',
          limitations: 'Computational cost remains high for sub-30ms target latency.'
        },
        {
          title: 'Real-Time Plastic and Organic Waste Classification Using Hybrid CNN-SVM',
          similarity_score: 71.4,
          year: 2022,
          source: 'Semantic Scholar',
          authors: ['Sharma, A.', 'Venkatesh, K.'],
          abstract: 'A hybrid feature extraction pipeline using MobileNetV2 features fed into a Support Vector Machine classifier. Tested primarily on clean, laboratory-photographed waste items with small dataset constraints.',
          url: 'https://semanticscholar.org/paper/example-waste-3',
          methodology: 'MobileNetV2 feature extractor + Linear SVM',
          dataset: 'Kaggle Waste Classification Dataset (2,500 images)',
          limitations: 'Small dataset without occlusion or overlap handling.'
        },
        {
          title: 'Autonomous Robotic Arm Segregation of Recyclables Using RGB-D Perception',
          similarity_score: 64.8,
          year: 2023,
          source: 'OpenAlex',
          authors: ['Lindqvist, J.', 'Nygren, F.'],
          abstract: 'Explores robotic grasp planning coupled with 3D point cloud segmentation for mechanical sorting arms. Requires extensive calibration and real-world validation across continuous operating shifts.',
          url: 'https://openalex.org/Wexample-waste-4',
          methodology: 'PointNet++ with RGB-D depth camera fusion',
          dataset: 'Proprietary sorting facility capture (8 hours)',
          limitations: 'High hardware cost and lack of open benchmark validation.'
        }
      ],
      similarity_results: [
        { title: 'Automated Waste Sorting Using Deep CNNs', score: 88.5, url: 'https://semanticscholar.org/paper/example-waste-1' },
        { title: 'Multi-Class Municipal Solid Waste Detection via ViT', score: 79.2, url: 'https://openalex.org/Wexample-waste-2' },
        { title: 'Real-Time Plastic and Organic Waste Classification', score: 71.4, url: 'https://semanticscholar.org/paper/example-waste-3' },
        { title: 'Autonomous Robotic Arm Segregation Using RGB-D', score: 64.8, url: 'https://openalex.org/Wexample-waste-4' }
      ],
      comparison: [
        {
          title: 'Automated Waste Sorting Using Deep CNNs',
          year: 2023,
          source: 'Semantic Scholar',
          methodology: 'YOLOv7 fine-tuned',
          dataset: 'TrashNet & Custom (12k)',
          limitations: 'Lighting sensitivity; edge latency',
          url: 'https://semanticscholar.org/paper/example-waste-1'
        },
        {
          title: 'Multi-Class Solid Waste Detection via ViT',
          year: 2024,
          source: 'OpenAlex',
          methodology: 'MobileViT hybrid',
          dataset: 'TACO + Urban Bins',
          limitations: 'High computational cost',
          url: 'https://openalex.org/Wexample-waste-2'
        },
        {
          title: 'Real-Time Plastic & Organic Classification',
          year: 2022,
          source: 'Semantic Scholar',
          methodology: 'MobileNetV2 + SVM',
          dataset: 'Kaggle Waste (2.5k)',
          limitations: 'Small clean dataset only',
          url: 'https://semanticscholar.org/paper/example-waste-3'
        },
        {
          title: 'Robotic Arm Segregation with RGB-D Perception',
          year: 2023,
          source: 'OpenAlex',
          methodology: 'PointNet++ with RGB-D',
          dataset: 'Proprietary Facility (8h)',
          limitations: 'Real-world calibration drift',
          url: 'https://openalex.org/Wexample-waste-4'
        }
      ],
      limitations: [
        { theme: 'lighting robustness', type: 'AI-identified possible limitation', evidence: 'Phrase "low-light" detected in retrieved abstracts; verify in full text.' },
        { theme: 'dataset diversity/size', type: 'AI-identified possible limitation', evidence: 'Phrase "limited dataset" detected in retrieved abstracts; verify in full text.' },
        { theme: 'computational cost', type: 'AI-identified possible limitation', evidence: 'Phrase "computational cost" detected in retrieved abstracts; verify in full text.' },
        { theme: 'real-world validation', type: 'AI-identified possible limitation', evidence: 'Phrase "real-world" detected in retrieved abstracts; verify in full text.' }
      ],
      research_gaps: [
        {
          title: 'Robust Occlusion & Degraded Condition Detection on Edge Devices',
          description: 'Investigate whether quantized neural networks can maintain high classification F1-scores under heavy item occlusion, soiled surfaces, and variable conveyor speeds without cloud round-trip latency.',
          basis: 'Synthesized from retrieved papers noting failure under uncalibrated illumination and overlapping recyclable items.'
        },
        {
          title: 'Multi-Modal Sensor Fusion for Non-Visual Material Identification',
          description: 'Most existing works rely strictly on standard RGB sensors. Integrating near-infrared (NIR) or acoustic sensing could reliably distinguish transparent PET plastic from PVC.',
          basis: 'Literature review shows pure vision struggles with transparent polymers of identical visual reflection.'
        }
      ],
      innovations: [
        {
          feature: 'Quantized INT8 TensorRT Pipeline on Edge SBC',
          why: 'Enables sub-20ms inference on low-cost devices like Raspberry Pi 5 or Jetson Orin Nano, cutting bill of materials.',
          problem: 'High computational latency on industrial edge',
          difficulty: 'Medium'
        },
        {
          feature: 'Synthetic Occlusion Augmentation Pipeline',
          why: 'Simulates overlapping, crushed, and soiled waste items during training to improve real-world robustness.',
          problem: 'Dataset coverage gaps and clean-data bias',
          difficulty: 'Low'
        },
        {
          feature: 'Closed-Loop Pneumatic Sorting Actuator Feedback',
          why: 'Validates that physically segregated items match predicted classes through optical confirmation gates.',
          problem: 'Mechanical actuation timing mismatch',
          difficulty: 'Hard'
        }
      ],
      evaluation: {
        novelty: 68,
        innovation: 78,
        feasibility: 85,
        research_potential: 75,
        impact: 82
      },
      evaluation_explanations: {
        novelty: 'Good differentiation from generic waste classifiers by focusing on edge optimization and multi-class contamination handling.',
        innovation: 'Strong practical value proposition with actionable edge deployment and real-time conveyor integration.',
        feasibility: 'High feasibility using established open-source tools (YOLOv8, ONNX, OpenCV) and readily accessible hardware.',
        research_potential: 'Considerable academic and engineering value for capstone demonstrations or conference student tracks.',
        impact: 'Direct positive ecological alignment with UN Sustainable Development Goals (SDG 11 & 12).'
      },
      api_status: [],
      notice: 'Similarity is semantic similarity, not novelty. Analyses are AI-assisted prototypes.'
    }
  },
  {
    id: 'cardiac-arrhythmia',
    title: 'Real-Time Edge-AI ECG Arrhythmia Classification',
    description: 'A wearable IoT device running lightweight 1D-CNN models to detect atrial fibrillation and cardiac arrhythmias in real time with ultra-low power consumption.',
    domain: 'Healthcare',
    technologies: ['Python', 'TensorFlow Lite', 'ESP32', '1D-CNN', 'Scipy'],
    project_level: 'Final Year Project',
    sampleAnalysis: {
      papers: [
        {
          title: 'Lightweight Deep Learning for Real-Time Atrial Fibrillation Detection on Wearable Sensors',
          similarity_score: 91.2,
          year: 2024,
          source: 'Semantic Scholar',
          authors: ['Gupta, N.', 'Santos, D.', 'Hoffmann, T.'],
          abstract: 'Presents a 1D convolutional neural network compressed via pruning and 8-bit quantization for deployment on battery-constrained microcontrollers. Benchmarked on MIT-BIH Arrhythmia database.',
          url: 'https://semanticscholar.org/paper/example-ecg-1',
          methodology: 'Quantized 1D-CNN (4 convolutional stages)',
          dataset: 'MIT-BIH Arrhythmia Database',
          limitations: 'High patient-specific false positive rates under motion artifacts.'
        },
        {
          title: 'Energy-Efficient Patient-Specific Arrhythmia Monitoring via Edge Computing',
          similarity_score: 83.7,
          year: 2023,
          source: 'OpenAlex',
          authors: ['Kowalski, P.', 'Vargas, L.'],
          abstract: 'Investigates energy harvesting and duty-cycled inference strategies for continuous 24-hour ambulatory cardiac monitoring. Computational cost remains a bottleneck during wireless telemetry bursts.',
          url: 'https://openalex.org/Wexample-ecg-2',
          methodology: 'Duty-cycled MobileNetV3 1D variant',
          dataset: 'PhysioNet Challenge 2021',
          limitations: 'Battery drain during burst transmission; limited cross-patient generalization.'
        }
      ],
      similarity_results: [
        { title: 'Lightweight Deep Learning for Real-Time AFib Detection', score: 91.2, url: 'https://semanticscholar.org/paper/example-ecg-1' },
        { title: 'Energy-Efficient Patient-Specific Arrhythmia Monitoring', score: 83.7, url: 'https://openalex.org/Wexample-ecg-2' }
      ],
      comparison: [
        {
          title: 'Lightweight Deep Learning for Real-Time AFib Detection',
          year: 2024,
          source: 'Semantic Scholar',
          methodology: 'Quantized 1D-CNN',
          dataset: 'MIT-BIH (48 records)',
          limitations: 'Motion artifact sensitivity',
          url: 'https://semanticscholar.org/paper/example-ecg-1'
        },
        {
          title: 'Energy-Efficient Patient-Specific Arrhythmia Monitoring',
          year: 2023,
          source: 'OpenAlex',
          methodology: 'Duty-cycled MobileNetV3 1D',
          dataset: 'PhysioNet 2021',
          limitations: 'Battery drain on wireless bursts',
          url: 'https://openalex.org/Wexample-ecg-2'
        }
      ],
      limitations: [
        { theme: 'computational cost', type: 'AI-identified possible limitation', evidence: 'Phrase "computational cost" detected in retrieved abstracts; verify in full text.' },
        { theme: 'real-world validation', type: 'AI-identified possible limitation', evidence: 'Phrase "real-world" detected in retrieved abstracts; verify in full text.' }
      ],
      research_gaps: [
        {
          title: 'Motion Artifact Rejection Without Loss of Beat Morphology',
          description: 'Explore adaptive filtering coupled with IMU accelerometer signals to cancel out motion noise before 1D-CNN classification.',
          basis: 'Retrieved literature reveals motion noise as the primary source of false alarms in ambulatory cardiac telemetry.'
        }
      ],
      innovations: [
        {
          feature: 'Accelerometer-Coupled Adaptive Denoising Filter',
          why: 'Suppresses muscular movement artifacts before signal hits neural classifier, drastically reducing false alert alarms.',
          problem: 'Ambulatory patient movement artifacts',
          difficulty: 'Medium'
        },
        {
          feature: 'TinyML On-Device Transfer Learning',
          why: 'Enables baseline personalization to an individual patient morphology with fewer than 50 calibrated heartbeats.',
          problem: 'Cross-patient generalization variance',
          difficulty: 'Hard'
        }
      ],
      evaluation: {
        novelty: 74,
        innovation: 82,
        feasibility: 78,
        research_potential: 88,
        impact: 92
      },
      evaluation_explanations: {
        novelty: 'Focusing on on-device personalization and artifact rejection provides a novel angle over generic MIT-BIH classifiers.',
        innovation: 'High life-saving potential for early detection of sudden arrhythmias in remote outpatient care.',
        feasibility: 'Hardware components (AD8232 ECG sensor + ESP32) are cheap and well documented.',
        research_potential: 'Very high publication suitability in biomedical engineering and edge computing venues.',
        impact: 'Direct public health benefits and patient quality of life improvements.'
      },
      api_status: [],
      notice: 'Similarity is semantic similarity, not novelty. Analyses are AI-assisted prototypes.'
    }
  },
  {
    id: 'cybersecurity-iot',
    title: 'Zero-Trust IoT Anomaly Detection via Federated Learning',
    description: 'A decentralized intrusion detection system where smart home and industrial IoT gateways train anomaly models locally without sending raw network traffic to a centralized server.',
    domain: 'Cybersecurity',
    technologies: ['Python', 'PySyft', 'Scikit-learn', 'Docker', 'NetworkX'],
    project_level: 'Research Project',
    sampleAnalysis: {
      papers: [
        {
          title: 'Federated Anomaly Detection for Distributed IoT Networks Against Zero-Day Exploits',
          similarity_score: 87.4,
          year: 2024,
          source: 'Semantic Scholar',
          authors: ['Zhao, Y.', 'Kaufman, M.', 'Schmidt, A.'],
          abstract: 'Proposes an asynchronous federated learning framework with differential privacy guarantees for edge IoT routers. Evaluated on modern N-BaIoT and TON_IoT datasets.',
          url: 'https://semanticscholar.org/paper/example-fed-1',
          methodology: 'Federated Averaging with Laplacian Differential Privacy',
          dataset: 'N-BaIoT & TON_IoT',
          limitations: 'High communication overhead during model aggregation under unstable network backhauls.'
        }
      ],
      similarity_results: [
        { title: 'Federated Anomaly Detection for Distributed IoT Networks', score: 87.4, url: 'https://semanticscholar.org/paper/example-fed-1' }
      ],
      comparison: [
        {
          title: 'Federated Anomaly Detection for Distributed IoT Networks',
          year: 2024,
          source: 'Semantic Scholar',
          methodology: 'FedAvg with Differential Privacy',
          dataset: 'N-BaIoT & TON_IoT',
          limitations: 'Communication overhead',
          url: 'https://semanticscholar.org/paper/example-fed-1'
        }
      ],
      limitations: [
        { theme: 'computational cost', type: 'AI-identified possible limitation', evidence: 'Aggregator communication and gradient verification cost.' }
      ],
      research_gaps: [
        {
          title: 'Byzantine-Robust Aggregation Under Malicious Node Poisoning',
          description: 'Investigate defenses against malicious edge nodes injecting corrupted gradient vectors to blind the anomaly detector.',
          basis: 'Synthesized from distributed threat models in federated security literature.'
        }
      ],
      innovations: [
        {
          feature: 'Sparse Gradient Compression with Top-K Sparsification',
          why: 'Reduces model sync traffic by over 80% on metered 4G/5G edge gateways.',
          problem: 'High communication bandwidth consumption',
          difficulty: 'Medium'
        }
      ],
      evaluation: {
        novelty: 80,
        innovation: 85,
        feasibility: 72,
        research_potential: 90,
        impact: 88
      },
      evaluation_explanations: {
        novelty: 'Combines zero-trust architecture principles with privacy-preserving federated intelligence.',
        innovation: 'Crucial for modern industrial operational technology (OT) security.',
        feasibility: 'Requires simulation testbeds or virtual networks (Mininet/Docker) to showcase properly.',
        research_potential: 'Extremely high relevance in modern cybersecurity journals.',
        impact: 'Prevents critical infrastructure downtime and IoT botnet recruitment.'
      },
      api_status: [],
      notice: 'Similarity is semantic similarity, not novelty. Analyses are AI-assisted prototypes.'
    }
  }
];

export const DOMAINS = [
  'Artificial Intelligence',
  'Machine Learning',
  'Computer Vision',
  'Natural Language Processing',
  'Data Science',
  'Cybersecurity',
  'IoT & Edge Computing',
  'Robotics',
  'Healthcare & Bioinformatics',
  'Web & Cloud Systems',
  'Mobile Development',
  'Blockchain & FinTech',
  'Other'
];

export const PROJECT_LEVELS = [
  'Mini Project',
  'Major Project',
  'Research Project',
  'Final Year Project',
  'Master / Capstone Thesis'
];

export const POPULAR_TECH_TAGS = [
  'Python', 'PyTorch', 'TensorFlow', 'OpenCV', 'YOLOv8', 'scikit-learn',
  'FastAPI', 'Flask', 'React', 'Docker', 'Raspberry Pi', 'ESP32', 'ROS2', 'HuggingFace'
];
