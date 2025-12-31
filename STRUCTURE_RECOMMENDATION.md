# Recommended Project Structure

## Current Issues
1. **Flat notebook organization**: All notebooks in one directory makes it hard to find specific chart types
2. **Mixed file types**: Python scripts mixed with notebooks
3. **Output organization**: Generated images not organized by chart type or date
4. **No reusable code structure**: Shared utilities/styles scattered across notebooks
5. **Inconsistent naming**: Mix of naming conventions (hyphens vs underscores)

## Recommended Structure

```
Data-visualisation/
├── README.md
├── requirements.txt
├── .gitignore
│
├── notebooks/                    # All Jupyter notebooks organized by chart type
│   ├── bar/
│   │   ├── barplots.ipynb
│   │   ├── grouped_barplots.ipynb
│   │   ├── horizontal-barplot-with-labels-the-economist.ipynb
│   │   └── README.md              # Brief description of bar chart examples
│   ├── line/
│   │   ├── line-chart-with-labels-at-line-end.ipynb
│   │   ├── lineplots-and-area-chart-the-economist.ipynb
│   │   ├── stacked-line-chart-with-labels.ipynb
│   │   └── timeseries.ipynb
│   ├── area/
│   │   ├── area-chart-with-different-colors-for-positive-and-negative-values.ipynb
│   │   ├── stacked-area-with-inflexion-arrows.ipynb
│   │   └── lineplots-and-area-chart-the-economist.ipynb
│   ├── scatter/
│   │   ├── scatterplot-text-annotation-and-regression-matplotlib.ipynb
│   │   └── bubble-plot-with-annotations-and-custom-features.ipynb
│   ├── specialized/
│   │   ├── dumbell-chart.ipynb
│   │   ├── ridgeline-graph-seaborn.ipynb
│   │   └── slopegraph.ipynb       # Convert .py to .ipynb
│   ├── time-series/
│   │   ├── time-series-and-facetting-with-matplotlib.ipynb
│   │   ├── timeseries_ourworldindata.ipynb
│   │   └── timeseries.ipynb
│   ├── styles/
│   │   └── economist_style.ipynb
│   └── experiments/              # Renamed from playground
│       ├── class_matplotlib.ipynb
│       └── maps.ipynb
│
├── src/                          # Reusable Python code
│   ├── __init__.py
│   ├── styles/
│   │   ├── __init__.py
│   │   ├── economist.py          # Economist style configurations
│   │   ├── swd.py                 # Storytelling with Data styles
│   │   └── colors.py              # Color palettes (GRAY1, BLUE1, etc.)
│   ├── utils/
│   │   ├── __init__.py
│   │   ├── annotations.py         # Helper functions for annotations
│   │   └── formatting.py          # Text formatting utilities
│   └── charts/
│       ├── __init__.py
│       ├── slopegraph.py          # Moved from notebooks/
│       └── [other reusable chart functions]
│
├── data/                         # Datasets (if any)
│   ├── raw/                      # Original data files
│   └── processed/                # Cleaned/processed data
│
├── output/                       # Generated visualizations
│   ├── bar/
│   ├── line/
│   ├── area/
│   ├── scatter/
│   └── [other chart types]
│
├── motivation/                   # Reference images (keep as is, but consider renaming)
│   ├── bar/
│   │   └── horizontal/
│   ├── line/
│   └── slides/
│
└── docs/                         # Additional documentation
    ├── chart-guide.md            # Guide on when to use which chart
    └── style-guides.md           # Links to style references
```

## Key Improvements

### 1. **Organized Notebooks by Chart Type**
- Easy to find specific visualization examples
- Clear categorization
- Each category can have its own README

### 2. **Separated Reusable Code**
- `src/` folder for Python modules
- Shared styles and utilities in dedicated modules
- Can be imported across notebooks

### 3. **Better Output Organization**
- Outputs organized by chart type
- Easier to find generated images
- Can add date-based subfolders if needed

### 4. **Clear Separation of Concerns**
- Notebooks for examples/tutorials
- Python scripts for reusable functions
- Data in dedicated folder
- Documentation in docs/

### 5. **Improved Naming**
- Consistent folder structure
- `experiments/` instead of `playground/` (more professional)
- `motivation/` could be renamed to `references/` or `inspiration/`

## Migration Steps

1. **Create new folder structure**
2. **Move notebooks** to appropriate chart type folders
3. **Extract reusable code** from notebooks to `src/`
4. **Convert slopegraph.py** to notebook or move to `src/charts/`
5. **Reorganize outputs** by chart type
6. **Update README.md** with new structure
7. **Create .gitignore** if not present

## Alternative: Simpler Structure

If you prefer a simpler structure, consider:

```
Data-visualisation/
├── notebooks/
│   ├── bar/
│   ├── line/
│   ├── area/
│   ├── scatter/
│   └── other/
├── src/              # Shared code
├── output/           # Generated images
├── references/       # Inspiration images
└── data/             # Datasets
```

This maintains organization while being less granular.

