// jQuery objects
const svgContainer = $("#svgContainer");

let hexagons = [];
const projectsData = [];
const MARGIN = 20;
const draw = SVG(svgContainer[0]);
const COLUMN_COUNT = 3;
const STROKE_WIDTH = 12; // temp, right now just copying from .hexagon-link styles
//const HEXAGON_COUNT = 5;

// todo: fix responsive svgContainerWidth
// todo: fix centering hexagons

$(document).ready(function () {
    init();
});

function init() {

    $.get("/Projects/GetProjects",
        function (data) {

            // add the hexagon links
            for (let i = 0; i < data.length; i++) {
                if (data[i].showOnDashboard) {
                    projectsData.push({ projectName: data[i].projectName, controllerName: data[i].controllerName });
                }
            }

            // testing: add the hexagon links
            //for (let i = 0; i < HEXAGON_COUNT; i++) {
            //    if (data[0].showOnDashboard) {
            //        projectsData.push({ projectName: data[0].projectName, controllerName: data[0].controllerName });
            //    }
            //}

        }
    ).done(function () {

        createHexagons(projectsData.length, COLUMN_COUNT);
        setupSvgContainerWidth();
        setupSvgContainerHeight();
        drawHexagons();

    });

}

$(window).resize(function () {
    if (projectsData.length !== 0) { // temp? should not allow resize if no data yet?

        createHexagons(projectsData.length, COLUMN_COUNT);
        setupSvgContainerWidth();
        setupSvgContainerHeight();
        svgContainer.find("a").remove();

        drawHexagons();
    }
});

function setupSvgContainerWidth() {
    let totalHexagonWidth = hexagons[0].width - MARGIN / 2;
    if (hexagons.length > 1) {
        if (hexagons.length >= COLUMN_COUNT) {
            totalHexagonWidth += (COLUMN_COUNT - 1) * (hexagons[0].width * 0.75) + STROKE_WIDTH;
        }
        else {
            totalHexagonWidth += (hexagons.length - 1) * (hexagons[0].width * 0.75) + STROKE_WIDTH;
        }
    }

    svgContainer.css("width", totalHexagonWidth);
}

function setupSvgContainerHeight() {
    let greatestBottom = 0;

    for (i = 0; i < hexagons.length; i++) {
        if (hexagons[i].y + (hexagons[i].height / 2) > greatestBottom) {
            greatestBottom = hexagons[i].y + (hexagons[i].height / 2) + STROKE_WIDTH / 2;
        }
    }

    svgContainer.css("height", greatestBottom);
}

// todo: make grid and hexagon size responsive
function createHexagons(n, columnCount) {

    hexagons = []; // reset
    let containerWidth = $(".container").width();

    let radius = (containerWidth / (2 + 1.5 * (columnCount - 1))) - ((columnCount - 1) * MARGIN) / ((2 + 1.5 * (columnCount - 1)));
    let width = Hexagon.getWidth(radius);
    let height = Hexagon.getHeight(radius);

    let xFirst = width / 2 - MARGIN / 4;
    let yFirst = height + STROKE_WIDTH * 1.25;

    for (let i = 0; i < n; i++) {

        let row = Math.floor(i / columnCount);
        let column = i % columnCount;

        let isLastRow = row === Math.floor(n / columnCount);
        let positionInRow = i % columnCount;
        let nAfter = n - i - 1;
        let nInPreviousRows = row * columnCount;
        let nOddColumns = Math.floor(columnCount / 2);


        if (isLastRow && row > 0) { // lastRow has unique possibility of not being filled
            let nFinalInThisRow = n - nInPreviousRows;

            let oddColumnsFilled = nFinalInThisRow > nOddColumns;
            if (!oddColumnsFilled) {
                let nextEmptyOddColumn = (positionInRow * 2) + 1;
                column = nextEmptyOddColumn;
            }
            else {
                let filledEvenColumns = nFinalInThisRow - nOddColumns;

                let columnIsEven = positionInRow % 2 === 0;

                if (positionInRow > 0) { // if not in the first column
                    let nextEmptyOddColumn = 0;
                    let nOddFilledBehind;
                    if (positionInRow < 2) {
                        nOddFilledBehind = 0;
                    }
                    else {

                        if (positionInRow > nOddColumns) { // right now for n = 11 and over...
                            nOddFilledBehind = Math.floor(positionInRow / 2);
                        }
                        else {
                            nOddFilledBehind = positionInRow - 1;
                        }

                    }

                    if (columnIsEven) { // if current column is even
                        let nextOneIsLast = (i + 2) === n;

                        let oddLeft = nOddColumns - nOddFilledBehind;
                        let shouldBeOdd = nextOneIsLast && oddLeft > 1;

                        let shouldStayHere = (column <= filledEvenColumns) || (nextOneIsLast && !shouldBeOdd);
                        if (shouldStayHere) {
                            column = column;
                        }
                        else {

                            nextEmptyOddColumn = ((nOddFilledBehind + 1) * 2) - 1;

                            column = nextEmptyOddColumn;
                        }

                    }
                    else { // if current column is odd
                        let shouldBeOdd = nOddFilledBehind < nOddColumns;
                        if (!shouldBeOdd) {
                            column = nextEmptyOddColumn;
                            nextEmptyOddColumn = positionInRow * 2 - 1;
                        }
                        else {
                            if (nAfter === 0 || true) { // aka is this the last element
                                nextEmptyOddColumn = ((nOddFilledBehind + 1) * 2) - 1;
                                column = nextEmptyOddColumn;
                            }
                        }
                    }
                }
            }
        }

        let isOddColumn = column % 2 !== 0;

        let yOffsetColumn = isOddColumn ? -height * 0.5 - MARGIN / 2 : 0;
        let xOffsetRow = 0;

        let x = xFirst + xOffsetRow + radius * 1.5 * column + MARGIN * column;
        let y = yFirst + yOffsetColumn + (height * row) + MARGIN * row;

        let hexagon = new Hexagon(x, y, radius);
        hexagons.push(hexagon);

        column = i;
    }
}


function centerText(text, hexagon, animate = false) {
    if (animate) {
        text.animate().center(hexagon.x, hexagon.y);
    }
    else {
        text.center(hexagon.x, hexagon.y);
    }
}


// todo: make text size dynamic to avoid overlap
function drawHexagons() {

    for (let i = 0; i < hexagons.length; i++) {

        let hexagon = hexagons[i];


        // gradient for filling hexagons
        let s1;
        let s2;
        let s3;
        let gradient = draw.gradient("linear", function (add) {
            s1 = add.stop(0).attr({ "class": "s1" });
            s2 = add.stop(0.35).attr({ "class": "s2" });
            s3 = add.stop(1).attr({ "class": "s3" });
        });
        gradient.from(0, 1).to(0, 0);


        // draw the hexagons with text and links
        let polygon = draw.polygon(`${hexagon.tr} ${hexagon.r} ${hexagon.br} ${hexagon.bl} ${hexagon.l} ${hexagon.tl}`);

        polygon.addClass("hexagon").linkTo(projectsData[i].controllerName);

        polygon.parent().addClass("hexagon-link");
        let text = polygon.parent().text(projectsData[i].projectName);
        //let text = polygon.parent().text("Project " + (i + 1));
        centerText(text, hexagon);

        polygon.fill(gradient);

        // mouse hover event styles
        polygon.parent().mouseenter(function () {
            s1.addClass("hovered");
            s2.addClass("hovered");
            s3.addClass("hovered");
            centerText(text, hexagon, true);
        });

        polygon.parent().mouseleave(function (e) {
            s1.removeClass("hovered");
            s2.removeClass("hovered");
            s3.removeClass("hovered");
            centerText(text, hexagon, true);
        });

    }

}


class Point {

    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    toString() {
        var s = this.x + "," + this.y;
        return s;
    }

}


class Hexagon {

    constructor(x, y, radius) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.width = Hexagon.getWidth(this.radius); // todo: see if can use width where possible
        this.height = Hexagon.getHeight(this.radius);

        this.projectName;
        this.controllerName;

        this.tr = this.getTopRightCorner().toString();
        this.r = this.getRightCorner().toString();
        this.br = this.getBottomRightCorner().toString();
        this.bl = this.getBottomLeftCorner().toString();
        this.l = this.getLeftCorner().toString();
        this.tl = this.getTopLeftCorner().toString();
    }

    static get HeightModifier() { return 30; };

    static getHeight(radius) {
        let val = Math.sqrt(3) * radius - Hexagon.HeightModifier + STROKE_WIDTH * 2;
        return val;
    }

    static getWidth(radius) {
        let val = radius * 2 + STROKE_WIDTH * 2;
        return val;
    }

    getTopRightCorner() {
        let xLength = this.radius / 2;

        let x = this.x + xLength;
        let y = this.y - this.height / 2;

        let p = new Point(x, y);

        return p;
    }

    getRightCorner() {
        let x = this.x + this.radius;

        let p = new Point(x, this.y);

        return p;
    }

    getBottomRightCorner() {
        let xLength = this.radius / 2;

        let x = this.x + xLength;
        let y = this.y + this.height / 2;

        let p = new Point(x, y);

        return p;
    }

    getBottomLeftCorner() {
        let xLength = this.radius / 2;

        let x = this.x - xLength;
        let y = this.y + this.height / 2;

        let p = new Point(x, y);

        return p;
    }

    getLeftCorner() {
        let x = this.x - this.radius;

        let p = new Point(x, this.y);

        return p;
    }

    getTopLeftCorner() {
        let xLength = this.radius / 2;

        let x = this.x - xLength;
        let y = this.y - this.height / 2;

        let p = new Point(x, y);

        return p;
    }

    getPath() {
        let val = "M" + this.tr.x + "," + this.tr.y + " L" + this.r.x + "," + this.r.y + " " + this.br.x + "," + this.br.y;
        val += " " + this.bl.x + "," + this.bl.y + " " + this.l.x + "," + this.l.y + " " + this.tl.x + "," + this.tl.y;
        val += "Z"

        return val;
    }

}