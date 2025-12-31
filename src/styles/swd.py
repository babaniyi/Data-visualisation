"""
Storytelling with Data (SWD) style configurations
Based on: https://www.storytellingwithdata.com/chart-guide
"""

import matplotlib
import matplotlib.pyplot as plt

def apply_swd_style():
    """
    Apply Storytelling with Data style to matplotlib plots
    """
    # Configure plot font family to Arial
    plt.rcParams['font.family'] = 'Arial'
    # Configure mathtext bold and italic font family to Arial
    matplotlib.rcParams['mathtext.fontset'] = 'custom'
    matplotlib.rcParams['mathtext.bf'] = 'Arial:bold'
    matplotlib.rcParams['mathtext.it'] = 'Arial:italic'

