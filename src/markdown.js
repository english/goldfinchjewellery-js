function markdown(md) {
  return replaceLink(replaceImage(md));

  function replaceImage(input) {
    var regex = /!\[([^\]<>]+)\]\(([^ \)<>]+)( "[^\(\)\"]+")?\)/g;
    var matches = regex.exec(input);

    if (!matches) return input;

    var replacement = '<img src="' + matches[2] + '">"';
    return input.replace(matches[0], replacement);
  }

  function replaceLink(input) {
    var regex = /\[([^\]<>]+)\]\(([^ \)<>]+)( "[^\(\)\"]+")?\)/g;
    var matches = regex.exec(input);

    if (!matches) return input;

    var replacement = '<a href="' + matches[2] + '">' + matches[1] + '</a>';
    return input.replace(matches[0], replacement);
  }
}
