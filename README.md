# Data Visualization Inspiration

This repository contains Python data visualization examples that showcase various chart types and styles. Some implementations are original, while others are inspired by open source projects and style guides.

## Project Structure

```
Data-visualisation/
├── notebooks/          # Jupyter notebooks organized by chart type
│   ├── bar/           # Bar chart examples
│   ├── line/          # Line chart examples
│   ├── area/          # Area chart examples
│   ├── scatter/       # Scatter and bubble plots
│   ├── specialized/   # Specialized charts (dumbbell, ridgeline, etc.)
│   ├── time-series/   # Time series visualizations
│   ├── styles/        # Style configuration examples
│   └── experiments/    # Experimental notebooks
├── src/               # Reusable Python code
│   ├── styles/        # Style configurations (colors, themes)
│   ├── utils/         # Utility functions
│   └── charts/        # Reusable chart functions
├── output/            # Generated visualizations (organized by chart type)
├── data/              # Datasets (raw and processed)
├── motivation/        # Reference images and inspiration
└── docs/              # Additional documentation
```

## Getting Started

1. Install dependencies:
```bash
pip install -r requirements.txt
```

2. Navigate to a notebook category (e.g., `notebooks/bar/`) and open a Jupyter notebook

3. Import shared utilities in your notebooks:
```python
from src.styles.colors import GRAY1, BLUE1, RED1
from src.styles.swd import apply_swd_style
from src.utils.annotations import rainbow_text
```

## Notebook Categories

- **Bar Charts** (`notebooks/bar/`) - Horizontal, vertical, grouped, and stacked bar charts
- **Line Charts** (`notebooks/line/`) - Line charts with labels and annotations
- **Area Charts** (`notebooks/area/`) - Area and stacked area charts
- **Scatter Plots** (`notebooks/scatter/`) - Scatter and bubble plots with annotations
- **Specialized** (`notebooks/specialized/`) - Dumbbell, ridgeline, slopegraph, lollipop, and swarm plots
- **Time Series** (`notebooks/time-series/`) - Time series visualizations and faceting
- **Styles** (`notebooks/styles/`) - Style guide implementations
- **Experiments** (`notebooks/experiments/`) - Experimental and exploratory work

## References

- [Python Graph Gallery](https://python-graph-gallery.com/)
- [Python Graph Gallery (GitHub)](https://github.com/holtzy/The-Python-Graph-Gallery/tree/master/src/notebooks)
- Storytelling with data: [Plots python](https://github.com/empathy87/storytelling-with-data) | [Chart guide](https://www.storytellingwithdata.com/chart-guide)
- [How to select charts and Viz inspiration](https://www.data-to-viz.com/#explore)
- [Data viz inspiration](https://www.dataviz-inspiration.com/?tools=python)
- [The Economist Style Guide](https://design-system.economist.com/documents/CHARTstyleguide_20170505.pdf) | [The Economist Data Visualisation Journalism](https://www.economist.com/graphic-detail?page=2)
- [Datylon - chart inspiration](https://insights.datylon.com/inspiration)
- [Slides Inspiration](https://www.slidestart.com/slides)