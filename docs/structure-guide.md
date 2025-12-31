# Project Structure Guide

This document explains the organization of the Data Visualization repository.

## Directory Overview

### `/notebooks/`
Jupyter notebooks organized by chart type. Each subdirectory contains:
- Example notebooks for that chart type
- A README.md explaining the contents

**Subdirectories:**
- `bar/` - Bar chart examples (horizontal, vertical, grouped, stacked)
- `line/` - Line chart examples
- `area/` - Area and stacked area charts
- `scatter/` - Scatter and bubble plots
- `specialized/` - Unique chart types (dumbbell, ridgeline, slopegraph, etc.)
- `time-series/` - Time series visualizations
- `styles/` - Style configuration examples
- `experiments/` - Experimental and exploratory notebooks

### `/src/`
Reusable Python code that can be imported across notebooks.

**Subdirectories:**
- `styles/` - Style configurations
  - `colors.py` - Color palette definitions
  - `economist.py` - The Economist style configurations
  - `swd.py` - Storytelling with Data style configurations
- `utils/` - Utility functions
  - `annotations.py` - Text annotation helpers (e.g., `rainbow_text`)
- `charts/` - Reusable chart functions

**Usage in notebooks:**
```python
from src.styles.colors import GRAY1, BLUE1, RED1
from src.styles.swd import apply_swd_style
from src.utils.annotations import rainbow_text
```

### `/output/`
Generated visualization images, organized by chart type to match the notebook structure.

### `/data/`
Datasets used in visualizations.
- `raw/` - Original, unprocessed data files
- `processed/` - Cleaned and processed data files

### `/motivation/`
Reference images and inspiration from various sources, organized by chart type.

### `/docs/`
Additional documentation and guides.

## Best Practices

1. **When creating new notebooks:**
   - Place them in the appropriate chart type folder
   - Use shared utilities from `src/` instead of duplicating code
   - Save outputs to the corresponding `output/` subdirectory

2. **When adding reusable code:**
   - Extract common functions to `src/utils/`
   - Extract style configurations to `src/styles/`
   - Extract chart functions to `src/charts/`

3. **When adding data:**
   - Place raw data in `data/raw/`
   - Place processed data in `data/processed/`
   - Document data sources in the notebook or a README

4. **Naming conventions:**
   - Use lowercase with hyphens for file names: `my-chart-example.ipynb`
   - Use descriptive names that indicate the chart type and key features

