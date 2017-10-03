import React, { Component } from 'react';

class Canvas extends Component {
    constructor( props ) {
        super( props );

        this.state = {
            canvasSize: {}, // Size of the canvas
            hexSize: 20, // Size of each hexagon
            hexOrigin: { x: 300, y: 300 } // Starting point of the (0, 0) hex
        }
    }

    componentWillMount() {
        let hexParams = this.getHexParams()
        this.setState({
            // Sets size of the canvas to state
            canvasSize: { width: 800, height: 600 },
            hexParams: hexParams
        })
    };

    
    componentDidMount() {
        const { width, height } = this.state.canvasSize

        // Gets canvas dimensions from state
        this.canvasHex.width = width
        this.canvasHex.height = height
        this.drawHexes();
    };

    // This draws all of the hexes that we want
    drawHexes() {
        const { width, height } = this.state.canvasSize
        const { hexWidth, hexHeight, vertDist, horizDist } = this.state.hexParams
        const hexOrigin = this.state.hexOrigin

        let qLeftSide = Math.round( hexOrigin.x / hexWidth ) * 2
        let qRightSide = Math.round( width - hexOrigin.x ) / hexWidth * 2
        let rTopSide = Math.round( hexOrigin.y / ( hexHeight / 2 ) )
        let rBottomSide = Math.round( height - hexOrigin.y ) / ( hexHeight / 2 )

        for( var r = -rTopSide; r <= rBottomSide; r++ ) {
            for( var q = -qLeftSide; q <= qRightSide; q++ ) {
                let center = this.hexToPixel( this.Hex( q, r ) )
                if( (center.x > hexWidth / 2 && center.x < width - hexWidth / 2) && ( center.y > hexHeight / 2 && center.y < height - hexHeight / 2 ) ) {
                    this.drawHex( this.canvasHex, center )
                    this.drawHexCoordinates( this.canvasHex, center, this.Hex( q, r ) )
                }
        
                
            }
        }
    }

    // This finds corner a and corner b, then draws a line between them
    // Repeats 6 times, once for each side of the hex
    drawHex( canvasID, center ) {
        for( var i = 0; i <= 5; i++ ) {
            let start = this.getHexCornerCoord( center, i )
            let end = this.getHexCornerCoord( center, i + 1 )

            this.drawLine( canvasID, { x: start.x, y: start.y }, { x: end.x, y: end.y } )
        }
    };

    // This draws a line between each corner of the hex
    drawLine( canvasID, start, end ) {
        const ctx = canvasID.getContext('2d')

        ctx.beginPath()
        ctx.moveTo( start.x, start.y )
        ctx.lineTo( end.x, end.y )
        ctx.stroke()
        ctx.closePath()
    };

    drawHexCoordinates( canvasID, center, h ) {
        const ctx = canvasID.getContext('2d')

        ctx.fillText( h.q, center.x-10, center.y )
        ctx.fillText( h.r, center.x+7, center.y )
    }

    // This finds the corner of each hex
    getHexCornerCoord( center, i ) {
        // KEY pointy or flat
        // '+ 30' is for pointy top. Omit for flat top

        // let angleDeg = 60 * i
        let angleDeg = 60 * i + 30
        let angleRad = Math.PI / 180 * angleDeg
        let x = center.x + this.state.hexSize * Math.cos( angleRad )
        let y = center.y + this.state.hexSize * Math.sin( angleRad )

        return this.Point( x, y )
    };

    getHexParams() {
        // KEY pointy or flat

        // flat
        // let hexWidth = this.state.hexSize * 2
        // let hexHeight = Math.sqrt(3)/2 * hexWidth
        // let vertDist = hexHeight
        // let horizDist = hexWidth * 3/4

        // pointy
        let hexHeight = this.state.hexSize * 2
        let hexWidth = Math.sqrt(3)/2 * hexHeight
        let vertDist = hexHeight * 3/4
        let horizDist = hexWidth

        return { hexWidth, hexHeight, vertDist, horizDist }
    }

    // This gets the center of each hex
    hexToPixel( h ) {
        // KEY pointy or flat
        // First set is for flat, second for pointy

        let hexOrigin = this.state.hexOrigin

        // let y = this.state.hexSize * Math.sqrt(3) * ( h.q + h.r / 2 ) + hexOrigin.y
        // let x = this.state.hexSize * 3/2 * h.r + hexOrigin.x
        let x = this.state.hexSize * Math.sqrt(3) * ( h.q + h.r / 2 ) + hexOrigin.x
        let y = this.state.hexSize * 3/2 * h.r + hexOrigin.y

        return this.Point( x, y )
    };

    // 'Point' and 'Hex' assign their parameters to objects
    Point( x, y ) {
        return { x, y }
    };

    Hex( q, r ) {
        return { q, r }
    }

    render() {
        return(
            <div>
                <canvas ref={ canvasHex => this.canvasHex = canvasHex } ></canvas>
            </div>
        )
    }
}

export default Canvas;