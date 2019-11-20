/**
 * Use on window scroll
 */
function runSkillBar() {
  var ourSkill = document.querySelector('.js-our-skills');
  var topDistance = ourSkill.offsetTop;
  var ourSkillHeight = ourSkill.offsetHeight;
  var scrollTop = window.scrollY;
  if (scrollTop > topDistance - ourSkillHeight/2) {
    var skillBars = document.querySelectorAll('.js-skill-bar');
    for (var item of skillBars) {
      var skillPoint = item.getAttribute('data-skill');
      var bar = new ProgressBar.Circle(item, {
        strokeWidth: 3,
        easing: 'easeInOut',
        duration: 1400,
        color: '#ffffff',
        trailColor: 'transparent',
        trailWidth: 1,
        svgStyle: null,
      });

      bar.animate(skillPoint/100);

      window.removeEventListener('scroll', runSkillBar);
    }
  }
}
