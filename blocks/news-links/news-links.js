// Get all fragment-wrapper elements
const fragmentWrappers = document.querySelectorAll('.fragment-wrapper');

// Check if there are at least two instances
if (fragmentWrappers.length >= 2) {
  // Get the second instance of fragment-wrapper
  const secondFragmentWrapper = fragmentWrappers[0];

  // Get all .section elements within the second fragment-wrapper
  const sections = secondFragmentWrapper.querySelectorAll('.section');

  // Loop through each section except for the last one
  sections.forEach((section, index) => {
    if (index < sections.length - 1) {
      section.style.borderBottom = '1px solid black';
      section.style.paddingBottom = '30px';
    }
  });
}
