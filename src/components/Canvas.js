import React, { Component } from 'react';

class Canvas extends Component {
    constructor( props ) {
        super( props );

        this.state = {
            canvasSize: {}, // Size of the canvas
            hexSize: 20, // Size of each hexagon
            hexOrigin: { x: 50, y: 50 } // Starting point of the (0, 0) hex
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
    // drawHexes() {
    //     const { width, height } = this.state.canvasSize
    //     const { hexWidth, hexHeight, vertDist, horizDist } = this.state.hexParams
    //     const hexOrigin = this.state.hexOrigin

        // let qLeftSide = Math.round( hexOrigin.x / hexWidth ) * 2
        // let qRightSide = Math.round( width - hexOrigin.x ) / hexWidth * 2
        // let rTopSide = Math.round( hexOrigin.y / ( hexHeight / 2 ) )
        // let rBottomSide = Math.round( height - hexOrigin.y ) / ( hexHeight / 2 )

    //     for( var r = -rTopSide; r <= rBottomSide; r++ ) {
    //         for( var q = -qLeftSide; q <= qRightSide; q++ ) {
    //             let center = this.hexToPixel( this.Hex( q, r ) )
    //             if( (center.x > hexWidth / 2 && center.x < width - hexWidth / 2) && ( center.y > hexHeight / 2 && center.y < height - hexHeight / 2 ) ) {
    //                 this.drawHex( this.canvasHex, center )
    //                 this.drawHexCoordinates( this.canvasHex, center, this.Hex( q, r ) )
    //             }
        
                
    //         }
    //     }
    // };

    drawHexes() {
        const { width, height } = this.state.canvasSize
        const { hexWidth, hexHeight, vertDist, horizDist } = this.state.hexParams
        const hexOrigin = this.state.hexOrigin

        let qLeftSide = Math.round( hexOrigin.x / horizDist )
        let qRightSide = Math.round( ( width - hexOrigin.x ) / horizDist )
        let rTopSide = Math.round( hexOrigin.y / ( vertDist ) )
        let rBottomSide = Math.round( ( height - hexOrigin.y ) / vertDist )

        // This is the bottom half
        var p = 0
        for( let r = 0; r <= rBottomSide; r++ ) {
            if( r % 2 === 0 && r !== 0 )
                p++
            for( let q = -qLeftSide; q <= qRightSide; q++ ) {
                const { x, y } = this.hexToPixel( this.Hex( q - p, r ) )

                if( ( x > hexWidth / 2 && x < width - hexWidth / 2) && ( y > hexHeight / 2 && y < height - hexHeight / 2 ) ) {
                    this.drawHex( this.canvasHex, this.Point( x, y ) )
                    this.drawHexCoordinates( this.canvasHex, this.Point( x, y ), this.Hex( q - p, r ) )
                }
            }
        }

        // This is the top half
        var n = 0
        for( let r = -1; r >= -rTopSide; r-- ) {
            if( r % 2 !== 0 )
                n++
            for( let q = -qLeftSide; q <= qRightSide; q++ ) {
                const { x, y } = this.hexToPixel( this.Hex( q + n, r ) )

                if( ( x > hexWidth / 2 && x < width - hexWidth / 2) && ( y > hexHeight / 2 && y < height - hexHeight / 2 ) ) {
                    this.drawHex( this.canvasHex, this.Point( x, y ) )
                    this.drawHexCoordinates( this.canvasHex, this.Point( x, y ), this.Hex( q - p, r ) )
                }
            }
        }
    };

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

        // flat
        // let angleDeg = 60 * i

        // pointy
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

        let hexOrigin = this.state.hexOrigin

        // flat
        // let y = this.state.hexSize * Math.sqrt(3) * ( h.q + h.r / 2 ) + hexOrigin.y
        // let x = this.state.hexSize * 3/2 * h.r + hexOrigin.x
        
        // pointy
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