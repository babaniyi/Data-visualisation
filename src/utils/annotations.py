"""
Annotation utilities for matplotlib plots
"""

from matplotlib import transforms


def rainbow_text(x, y, text, colors, spacing=20, ax=None, **kw):
    """
    Create multi-colored text annotations on a matplotlib plot.
    
    Parameters
    ----------
    x : float
        X position for the text
    y : float
        Y position for the text
    text : str
        Text to display. Use '||' to separate colored segments within a line,
        and '\\n' to create new lines
    colors : list of lists
        List of color lists, one per line. Each inner list contains colors
        for each segment separated by '||'
    spacing : float, default=20
        Spacing between lines
    ax : matplotlib.axes.Axes, optional
        Axes to plot on. If None, uses current axes
    **kw : dict
        Additional keyword arguments passed to ax.text()
    
    Examples
    --------
    >>> rainbow_text(102, 0.27,
    ...              '$\\bf{Survey\\ item\\ A}$\\n'
    ...              'ranked highest\\n'
    ...              'for team X',
    ...              [[BLUE2], [GRAY5], [GRAY5]],
    ...              spacing=20,
    ...              ax=ax,
    ...              fontsize=13)
    """
    if ax is None:
        import matplotlib.pyplot as plt
        ax = plt.gca()
    
    colors = list(reversed(colors))
    t = ax.transData
    canvas = ax.figure.canvas

    for i, line in enumerate(reversed(text.split('\n'))):
        strings = line.split('||')
        for s, c in zip(strings, colors[i]):
            text_obj = ax.text(x, y, s, color=c, transform=t, **kw)
            text_obj.draw(canvas.get_renderer())
            ex = text_obj.get_window_extent()
            t = transforms.offset_copy(text_obj._transform, x=ex.width, 
                                       units='dots')

        t = transforms.offset_copy(ax.transData, x=0, y=(i + 1) * spacing, 
                                   units='dots')

