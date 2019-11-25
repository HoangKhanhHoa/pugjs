/**
 * Use on window scroll to show skill bar
 */
function runSkillBar() {
  var ourSkill = $('.js-our-skills');
  var topDistance = ourSkill.offset().top;
  var ourSkillHeight = ourSkill.height();
  var scrollTop = window.pageYOffset;
  if (scrollTop > topDistance - ourSkillHeight) {
    $('.js-skill-bar').each(function() {
      var skillPoint = $(this).attr('data-skill');
      $(this).circularProgress({
        line_width: 3,
        color: '#ffffff',
        width: '162px',
        height: '162px',
        starting_position: 0,
        padding: 4,
        percent: 0,
        percentage: true,
      }).circularProgress('animate', skillPoint, 300);
    });

    window.removeEventListener('scroll', runSkillBar);
  }
}
