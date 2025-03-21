/**
 * @class ReviewCard
 * @extends HTMLElement
 * @description A custom web component that displays a product/service review card.
 * The card includes company information, star rating, reviewer name, and review text.
 * 
 * @example
 * <review-card
 *   company-name="Google"
 *   company-logo="path/to/logo.png"
 *   rating="4"
 *   review="The checklist ensures that the review process is thorough"
 *   reviewer="Samantha Lee"
 * ></review-card>
 * 
 * @property {string} companyName - The name of the company being reviewed
 * @property {string} logoUrl - URL to the company's logo image
 * @property {number} rating - Star rating (0-5)
 * @property {string} review - The review text content
 * @property {string} reviewer - Name of the person who wrote the review
 * 
 * @attribute {string} company-name - Sets the company name
 * @attribute {string} company-logo - Sets the URL for the company logo
 * @attribute {string} rating - Sets the star rating (will be converted to number)
 * @attribute {string} review - Sets the review text
 * @attribute {string} reviewer - Sets the reviewer's name
 */
class ReviewCard extends HTMLElement {
  /**
   * @property {string} companyName - The name of the company being reviewed
   */
  declare companyName: string;
  
  /**
   * @property {string} logoUrl - URL to the company's logo image
   */
  declare logoUrl: string;
  
  /**
   * @property {number} rating - Star rating (0-5)
   */
  declare rating: number;
  
  /**
   * @property {string} review - The review text content
   */
  declare review: string;
  
  /**
   * @property {string} reviewer - Name of the person who wrote the review
   */
  declare reviewer: string;

  /**
   * Creates an instance of ReviewCard and initializes Shadow DOM
   * Sets default values for all properties
   */
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.companyName = "Enter company name";
    this.logoUrl = "#";
    this.rating = 0;
    this.review = "paragraph review";
    this.reviewer = "Reviewer name";
  }

  /**
   * Invoked when the custom element is first connected to the document's DOM
   * Renders the component
   */
  connectedCallback() {
    this.render();
  }

  /**
   * Renders the component by attaching the template to the shadow DOM
   */
  render() {
    if (this.shadowRoot) {
      this.shadowRoot.innerHTML = ""; // Limpiar antes de renderizar
      this.shadowRoot.appendChild(this.getTemplate().content.cloneNode(true));
    }
  }

  /**
   * Specifies the attributes to observe for changes
   * @returns {string[]} List of attribute names to observe
   */
  static get observedAttributes() {
    return [
      "company-name",
      "company-logo",
      "rating",
      "review",
      "reviewer",
    ];
  }

  /**
   * Invoked when one of the custom element's attributes is added, removed, or changed
   * 
   * @param {string} attr - The name of the attribute that changed
   * @param {string} oldValue - The previous value of the attribute
   * @param {string} newValue - The new value of the attribute
   */
  attributeChangedCallback(attr: string, oldValue: string, newValue: string) {
    if (oldValue === newValue) return;

    switch (attr) {
      case "company-name":
        this.companyName = newValue;
        break;
      case "company-logo":
        this.logoUrl = newValue;
        break;
      case "rating":
        this.rating = Math.floor(Number(newValue));
        break;
      case "review":
        this.review = newValue;
        break;
      case "reviewer":
        this.reviewer = newValue;
        break;
    }

    // Solo renderizar si ya está conectado al DOM
    if (this.shadowRoot) {
      this.shadowRoot.innerHTML = "";
      this.render();
    }
  }

  /**
   * Creates and returns the HTML template for the component
   * 
   * @returns {HTMLTemplateElement} The template element containing the component's HTML structure
   */
  getTemplate() {
    const template = document.createElement("template");
    template.innerHTML = `
      <div class="review-card">
        <div>
          <img src="${this.logoUrl}" alt="${
      this.companyName
    } logo" aria-hidden="true"/>
          <div>
            ${Array.from(
              { length: this.rating },
              () =>
                `<img src="resources/Star_fill.svg" alt="star" aria-hidden="true"/>`
            ).join("")}
            ${Array.from(
              { length: 5 - this.rating },
              () =>
                `<img src="resources/Star_fill_gray.svg" alt="star" aria-hidden="true"/>`
            ).join("")}
          </div>
        </div>
        <span>${this.reviewer}</span>
        <p>
          ${this.review}
        </p>
      </div>    
      ${this.getStyles()}`;
    return template;
  }

  /**
   * Generates the CSS styles for the component
   * 
   * @returns {string} The CSS styles as a string
   */
  getStyles() {
    return `
      <style>
        :host { 
          --background-color: white;
          --primary-color: #333;
          --secondary-color: #555;
        }

        .review-card {
          box-sizing: border-box;
          background-color: var(--background-color);
          border-radius: 8px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          padding: 2.5rem;
          max-width: 396px;
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .review-card > div {
          display: flex;
          gap: 2rem;
          align-items: center;
        }

        .review-card span {
          font-size: 1.25rem;
          font-weight: bold;
          color: var(--primary-color);
        }

        .review-card p {
          font-size: 1.25rem;
          color: var(--secondary-color);
          text-wrap: balance;
          margin:0;
        }
      </style>
    `;
  }
}

// Register the custom element
customElements.define("review-card", ReviewCard);
